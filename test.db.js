const { Teacher, Student, Registration } = require("./models");

async function testDatabase() {
  await Teacher.create({ email: "teacher@example.com" });
  await Student.create({ email: "student@example.com" });

  console.log(await Teacher.findAll());
  console.log(await Student.findAll());
}

testDatabase();
