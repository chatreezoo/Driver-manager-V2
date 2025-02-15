const express = require("express");
const router = express.Router();
const scheduleModel = require("../model/Schedule");
var request = require("request");
var mysql = require("mysql");

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get("/home", (req, res) => {
  res.send("holo 2");
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM schedule";

  // Use the connection pool to handle database queries
  con.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const schedule = new scheduleModel({
    cars: req.body.cars,
    driver: req.body.driver,
    date: req.body.date,
    name: req.body.name,
    place: req.body.place,
    department: req.body.department,
    objective: req.body.objective,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    startTime: req.body.startTime,
    endDate: req.body.endDate,
    status: "รอดำเนินการ",
    approve: null,
  });
  console.log(schedule, "แสดง");
  var sql = `INSERT INTO schedule (
    date,
    cars,
    driver,
    endDate,
    name,
    department,
    objective,
    startTime,
    place,
    endTime,
    status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;

  con.query(
    sql,
    [
      schedule.date,
      schedule.cars,
      schedule.driver,
      schedule.endDate,
      schedule.name,
      schedule.department,
      schedule.objective,
      schedule.startTime,
      schedule.place,
      schedule.endTime,
      schedule.status,
    ],
    function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(result);
    }
  );
  // schedule
  //   .save()
  //   .then(() => res.json('Save Succesfuly!'))
  //   .catch(err => res.status(400).json(`error:${err}`))
});

router.put("/:id", (req, res) => {
  const car = req?.body?.cars;
  const name = req?.body?.name|| req?.body?.data?.name;
  const department = req?.body?.department;
  const type = req?.body?.type;
  let approve = req?.body?.approve;
  let status = req?.body?.status;
  let reason = req?.body?.data?.reason;
  const driver_name = req?.body?.employee?.name;
let sql= ""
console.log(driver_name,"driver_name")

  if (reason) {
  sql = `UPDATE schedule SET reason = ?, status = ? WHERE id =?`;
  status = "ไม่อนุมัติ"
  
  con.query(sql, [reason, status, req.params.id], function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    res.send(result);
    sendRejectNoti(name,reason);
  });
} else {
  sql = `UPDATE schedule SET approve = ?, status = ?,driver_name =? WHERE id =?`;
  con.query(sql, [approve, status,driver_name, req.params.id], function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    const time = (new Date())
    const sql2 =  `UPDATE cars SET update_time = ? WHERE plate =?`;
    con.query(sql2, [time,car], function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
    });
    res.send(result);
    sendnotification(name, department, car, approve,driver_name);
  });
  }
  
});

router.get("/:id", (req, res) => {
  scheduleModel
    .findById(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(`error:${err}`));
});

router.delete("/:id", (req, res) => {
  const name = req.body.name;
  const reason = req.body.reason;
  const sql = `DELETE FROM schedule WHERE id=?`;
  con.query(sql, [req.params.id], function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    sendRejectNoti(name, reason);
    res.send(result);
  });
});

function sendnotification(name, department, xxx, approve,driver_name) {
  var sendData = `ชื่อผู้จอง : ${name}\n แผนก: ${department}\n ประเภทรถ: ${xxx}\n คนขับ: ${!driver_name ?name :driver_name}\n คนอนุมัติ: ${approve}\n ตรวจสอบสถานะรายการจอง: http://192.168.100.108:3000/bookingReport`;
  var token = "YQPZOvgos8jdY7rdppYndNUtdoSLXy1w7vNtWSMXj1d";
  var message = sendData;

  console.log({ message });

  request(
    {
      method: "POST",
      uri: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        bearer: token,
      },
      form: {
        message: message,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("send notification");
      }
    }
  );
}

function sendRejectNoti(name, reason) {
  var sendData = `ชื่อผู้จอง : ${name}\n คำขอไม่ได้รับการอนุมัติเนื่องจาก : ${reason}`;
  var token = "YQPZOvgos8jdY7rdppYndNUtdoSLXy1w7vNtWSMXj1d";
  var message = sendData;

  console.log({ message });

  request(
    {
      method: "POST",
      uri: "https://notify-api.line.me/api/notify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        bearer: token,
      },
      form: {
        message: message,
      },
    },
    (err, httpResponse) => {
      if (err) {
        console.log(err);
      } else {
        console.log("send notification");
      }
    }
  );
}

module.exports = router;
