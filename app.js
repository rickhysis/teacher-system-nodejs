const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { sequelize } = require("./models");

const app = express();

app.use(bodyParser.json());
app.use("/api", routes);

if (process.env.NODE_ENV !== "test") {
    sequelize
      .authenticate()
      .then(() => console.log("Database connected..."))
      .catch((err) => console.error("Database connection error:", err));
  }

module.exports = app;
