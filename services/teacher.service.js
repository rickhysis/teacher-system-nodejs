const {
    teacher: Teacher,
    student: Student,
} = require("../models");

const findOrCreateTeacher = async (email) => {
    const [teacher] = await Teacher.findOrCreate({
        where: {
            email
        }
    });
    return teacher;
};

const getStudentsForTeachers = async (teacherEmails) => {
    return await Student.findAll({
        include: [{
            model: Teacher,
            where: {
                email: teacherEmails
            },
            through: {
                attributes: []
            }
        }]
    });
};

const getTeacherByEmail = async (email) => {
    return await Teacher.findOne({
        where: {
            email
        }
    });
};

module.exports = {
    findOrCreateTeacher,
    getStudentsForTeachers,
    getTeacherByEmail
};