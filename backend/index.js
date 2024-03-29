const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
require("dotenv").config();
var mysql = require("mysql");
// ตั้งค่า project
const app = express();
// ดึงค่า port จาก file env
const port = process.env.PORT ;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Middleware
app.use(express.json());
app.use(cors());

const scheduleRouter = require("./routes/ScheduleRoute");
app.use("/schedule", scheduleRouter);
const CarRouter = require("./routes/CarRoute");
app.use("/cars", CarRouter);
const employee = require("./routes/employee");
app.use("/employee", employee);

app.listen(port, () => console.log(`Running on port:${port}`));
