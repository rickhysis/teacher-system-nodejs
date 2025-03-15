jest.mock("../models");

const {
    teacher: Teacher,
    student: Student,
    registration: Registration,
} = require("../models");
const studentService = require("../services/student.service");

describe("Student Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should register student to a teacher", async () => {
        Registration.findOrCreate.mockResolvedValue([{
            teacherId: 1,
            studentId: 2
        }]);
        await studentService.registerStudentToTeacher(1, 2);

        expect(Registration.findOrCreate).toHaveBeenCalledWith({
            where: {
                teacherId: 1,
                studentId: 2
            }
        });
    });

    test("should return active students", async () => {
        Teacher.findAll = jest.fn().mockResolvedValue([{
            id: 1,
            email: "teacher1@example.com"
        }]);

        Student.findAll = jest.fn().mockResolvedValue([{
            email: "student1@example.com"
        }]);

        const students = await studentService.getActiveStudentsByTeacher(1);

        expect(students).toEqual([{
            email: "student1@example.com"
        }]);
    });
});