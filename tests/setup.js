jest.mock("../models", () => {
    const SequelizeMock = require("sequelize-mock");
    const dbMock = new SequelizeMock();

    return {
        sequelize: dbMock,
        teacher: {
            findOrCreate: jest.fn().mockResolvedValue([{
                id: 1,
                email: "teacher@example.com"
            }]),
            findOne: jest.fn(),
        },
        student: {
            findOrCreate: jest.fn().mockResolvedValue([{
                id: 2,
                email: "student1@example.com"
            }]),
            findOne: jest.fn(),
            findAll: jest.fn(),
        },
        registration: {
            findOrCreate: jest.fn().mockResolvedValue([{
                teacherId: 1,
                studentId: 2
            }]),
        },
        notification: {
            create: jest.fn().mockResolvedValue({
                id: 1,
                message: "Test notification"
            }),
        },
    };
});