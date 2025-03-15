const {
    teacher: Teacher,
    student: Student,
    registration: Registration,
} = require("../models");

const findOrCreateStudent = async (email) => {
    const [student] = await Student.findOrCreate({
        where: {
            email
        }
    });
    return student;
};

const registerStudentToTeacher = async (teacherId, studentId) => {
    await Registration.findOrCreate({
        where: {
            teacherId,
            studentId,
            isSuspended: false
        }
    });
};

const suspendStudent = async (email) => {
    const student = await Student.findOne({ where: { email } });
    if (!student) return null;

    await Registration.update(
        { isSuspended: true },
        { where: { studentId: student.id } }
    );

    return student;
};

const getActiveStudentsByTeacher = async (teacherId) => {
    const registrations = await Registration.findAll({
        where: { teacherId, isSuspended: false },
        include: [{
            model: Student,
            attributes: ["email"],
        }]
    });

    return registrations.map(reg => reg.student?.email).filter(email => email);
};




module.exports = {
    findOrCreateStudent,
    registerStudentToTeacher,
    suspendStudent,
    getActiveStudentsByTeacher
};