const teacherService = require("../services/teacher.service");
const studentService = require("../services/student.service");
const notificationService = require("../services/notification.service");

/**
 * Register students under a teacher
 */
exports.registerStudents = async (req, res) => {
  try {
    const { teacher, students } = req.body;
    if (!teacher || !Array.isArray(students)) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const teacherRecord = await teacherService.findOrCreateTeacher(teacher);

    for (const studentEmail of students) {
      const studentRecord = await studentService.findOrCreateStudent(studentEmail);
      await studentService.registerStudentToTeacher(teacherRecord.id, studentRecord.id);
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error registering students:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get common students for multiple teachers
 */
exports.getCommonStudents = async (req, res) => {
  try {
    const teacherEmails = req.query.teacher;
    if (!teacherEmails) {
      return res.status(400).json({ message: "Teacher email is required" });
    }

    const teacherList = Array.isArray(teacherEmails) ? teacherEmails : [teacherEmails];
    const students = await teacherService.getStudentsForTeachers(teacherList);
    const studentEmails = students.map(student => student.email);

    return res.status(200).json({ students: studentEmails });
  } catch (error) {
    console.error("Error fetching common students:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Suspend a student
 */
exports.suspendStudent = async (req, res) => {
  try {
    const { student } = req.body;
    if (!student) {
      return res.status(400).json({ message: "Student email is required" });
    }

    const studentRecord = await studentService.suspendStudent(student);
    if (!studentRecord) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Error suspending student:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Retrieve students for notifications
 */
exports.retrieveNotifications = async (req, res) => {
    try {
      const { teacher, notification } = req.body;
      if (!teacher || !notification) {
        return res.status(400).json({ message: "Teacher and notification text are required" });
      }
  
      const mentionedEmails = notification.match(/@[\w.-]+@[\w.-]+\.\w+/g) || [];
      const mentionedStudents = mentionedEmails.map(email => email.substring(1)); // Hilangkan '@'
  
      const teacherRecord = await teacherService.getTeacherByEmail(teacher);
      if (!teacherRecord) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      const registeredStudents = await studentService.getActiveStudentsByTeacher(teacherRecord.id);
      console.log("Registered active students:", registeredStudents);
  
      await notificationService.createNotification(teacher, notification);
  
      return res.status(200).json({ recipients: registeredStudents });
    } catch (error) {
      console.error("Error retrieving notifications:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  