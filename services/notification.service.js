const {
    notification: Notification,
    teacher: Teacher,
} = require("../models");


const createNotification = async (teacherEmail, message) => {
    const teacher = await Teacher.findOne({
        where: {
            email: teacherEmail
        }
    });
    if (!teacher) {
        throw new Error("Teacher not found");
    }

    return await Notification.create({
        teacherId: teacher.id,
        message,
    });
}


module.exports = {
    createNotification
};