const express = require("express");
const router = express.Router();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "driver",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM cars";

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

module.exports = router;

