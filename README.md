# Teacher-System API wit

## Table of Contents
- [Setup](#setup)
- [Database Migration](#database-migration)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
  - [Register Students](#register-students)
  - [Get Common Students](#get-common-students)
  - [Suspend Student](#suspend-student)
  - [Send Notification](#send-notification)

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/teacher-system-nodejs.git
   cd teacher-system-nodejs
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure Database
Edit `config/config.json` to set up your database connection:
```json
{
  "development": {
    "username": "root",
    "password": "password",
    "database": "your_database",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "test_database",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "password",
    "database": "prod_database",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
4. Run the server:
   ```sh
   npm start
   ```

## Database Migration

Build the database with migrations:
```sh
npx sequelize-cli db:create  
npx sequelize-cli db:migrate
```

## Running Tests
```sh
npm test
```

---

## API Endpoints

### Register Students

**Endpoint:** `POST /api/register`

**Request Body:**
```json
{
  "teacher": "teacher@example.com",
  "students": ["student1@example.com", "student2@example.com"]
}
```

**Curl Command:**
```sh
curl -X POST "http://localhost:3000/api/register" \
     -H "Content-Type: application/json" \
     -d '{"teacher":"teacher@example.com","students":["student1@example.com","student2@example.com"]}'
```

### Get Common Students

**Endpoint:** `GET /api/commonstudents?teacher=teacher@example.com&teacher=teacher2@example.com`

**Curl Command:**
```sh
curl -X GET "http://localhost:3000/api/commonstudents?teacher=teacher@example.com&teacher=teacher1@example.com"
```

### Suspend Student

**Endpoint:** `POST /api/suspend`

**Request Body:**
```json
{
  "student": "student1@example.com"
}
```

**Curl Command:**
```sh
curl -X POST "http://localhost:3000/api/suspend" \
     -H "Content-Type: application/json" \
     -d '{"student":"student1@example.com"}'
```

### Send Notification

**Endpoint:** `POST /api/retrievefornotifications`

**Request Body:**
```json
{
  "teacher": "teacher@example.com",
  "notification": "Hello students! @student1@example.com @student2@example.com"
}
```

**Curl Command:**
```sh
curl -X POST "http://localhost:3000/api/retrievefornotifications" \
     -H "Content-Type: application/json" \
     -d '{"teacher":"teacher@example.com","notification":"Hello students! @student1@example.com @student2@example.com"}'
```


## License
This project is licensed under the MIT License

