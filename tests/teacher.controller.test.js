const request = require("supertest");
const app = require("../app");
const {
    teacher: Teacher,
    student: Student,
    registration: Registration,
} = require("../models");

jest.mock("../models");

describe("Teacher Controller API", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("POST /api/register - should register students to a teacher", async () => {
        Teacher.findOrCreate.mockResolvedValue([{
            id: 1,
            email: "teacher@example.com"
        }]);
        Student.findOrCreate.mockResolvedValue([{
            id: 2,
            email: "student1@example.com"
        }]);
        Registration.findOrCreate.mockResolvedValue([{
            teacherId: 1,
            studentId: 2
        }]);

        const response = await request(app)
            .post("/api/register")
            .send({
                teacher: "teacher@example.com",
                students: ["student1@example.com"]
            });

        expect(response.status).toBe(204);
    });

    test("GET /api/commonstudents - should return common students for teachers", async () => {
        Student.findAll.mockResolvedValue([{
                email: "student1@example.com"
            },
            {
                email: "student2@example.com"
            }
        ]);

        const response = await request(app)
            .get("/api/commonstudents")
            .query({
                teacher: ["teacher1@example.com", "teacher2@example.com"]
            });

        expect(response.status).toBe(200);
        expect(response.body.students).toEqual(["student1@example.com", "student2@example.com"]);
    });

    test("POST /api/suspend - should suspend a student", async () => {
        Student.findOne.mockResolvedValue({
            email: "student1@example.com",
            suspended: false,
            save: jest.fn() // Mock fungsi save()
        });

        const response = await request(app)
            .post("/api/suspend")
            .send({
                student: "student1@example.com"
            });

        expect(response.status).toBe(204);
    });

    test("POST /api/retrievefornotifications - should return recipients", async () => {
        Teacher.findOne.mockResolvedValue({
            id: 1,
            email: "teacher@example.com"
        });
        Student.findAll.mockResolvedValue([{
            email: "student1@example.com"
        }]);

        const response = await request(app)
            .post("/api/retrievefornotifications")
            .send({
                teacher: "teacher@example.com",
                notification: "Hello students!"
            });

        expect(response.status).toBe(200);
        expect(response.body.recipients).toEqual(["student1@example.com"]);
    });
});