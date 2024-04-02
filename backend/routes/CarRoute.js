const express = require("express");
const router = express.Router();
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

router.get("/", (req, res) => {
  const sql = "SELECT * FROM cars";

  // Use the connection pool to handle database queries
  con.query(sql, function(err, result) {
    console.log(result);
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    res.send(result);
  });
});
router.post("/time", (req, res) => {
  const id = req.body.id;
  const plate = req.body.cars;
  const sql = `UPDATE cars SET update_time = ? WHERE plate =?`;
  console.log(plate, "+รอก");
  const time = new Date();
  con.query(sql, [time, plate], function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
      return;
    }
    const sql2 = `UPDATE schedule SET is_return_car = ? WHERE id =?`;
    con.query(sql2, [1, id], function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }
    });
    res.send(result);
  });
});

module.exports = router;
