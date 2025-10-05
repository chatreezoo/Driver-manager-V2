import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
import Button from "@mui/material/Button";
import "./Driver.css";
import axios from "../../axios";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Driver = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [cars, setCars] = useState("");
  const [date, setDate] = useState("");
  const [depart, setDepart] = useState("");
  const [name, setName] = useState("");
  const [driver, setDriver] = useState("");
  const [objective, setObjective] = useState("");
  const [place, setPlace] = useState("");
  const [enddate, setEnddate] = useState("");
  const [passengers, setPassengers] = useState("");
  const history = useHistory();
  const [carList, setCarList] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  const departmentList = ["เลือกคนขับ", "ขับเอง"];

  useEffect(() => {
    axios
      .get("cars")
      .then((res) => {
        const arr = [];
        const result = res.data;
        if (result.length > 0) {
          result.forEach((x) => {
            if (isMoreThanOneHourAgo(x.update_time)) {
              arr.push(x);
            }
          });
        }
        setCarList(arr);
      })
      .catch((err) => console.log(err));
  }, []);

  function isMoreThanOneHourAgo(time) {
    if (!time) {
      return true;
    }
    const startTime = new Date();
    const endTime = new Date(time);
    const timeDiff = Math.abs(endTime - startTime);
    const hoursDiff = timeDiff / (1000 * 60 * 60);

    console.log("The time difference is not more than 1 hour.");
    if (hoursDiff > 1) {
      return true;
    } else {
      return false;
    }
  }

  function handleClick() {
    history.push("/bookingReport");
  }

  function handleOpenConfirm() {
    if (
      !(
        date &&
        depart &&
        objective &&
        name &&
        startTime &&
        endTime &&
        enddate &&
        cars &&
        place &&
        driver &&
        passengers
      )
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (isNaN(Number(passengers))) {
      alert("จำนวนผู้โดยสารต้องเป็นตัวเลขเท่านั้น");
      return;
    }

    const now = new Date();
    const startDateTime = new Date(`${date}T${startTime}:00`);
    const endDateTime = new Date(`${enddate}T${endTime}:00`);

    if (startDateTime < now) {
      alert("กรุณากรอกวันที่และเวลาเริ่มต้นให้ถูกต้อง (ห้ามย้อนหลัง)");
      return;
    }

    if (endDateTime < startDateTime) {
      alert("กรุณากรอกวันที่และเวลาสิ้นสุดให้ถูกต้อง (ต้องไม่ย้อนหลังกว่าเวลาเริ่มต้น)");
      return;
    }

    setOpenConfirm(true);
  }

  function handleCloseConfirm() {
    setOpenConfirm(false);
  }

  function handleConfirmAndSubmit() {
    //ส่วนปั่นข้อมูล
    const post = {
      date: date,
      cars: cars,
      driver: driver,
      endDate: enddate,
      name: name,
      department: depart,
      objective: objective,
      startTime: startTime,
      endTime: endTime,
      place: place,
      passengers: passengers,
    };
    //ส่วนนี้ส่งข้อมูลไปยังแบ็กเอ็น
    axios
      .post("/schedule", post)
      .then(() => {
        handleClick();
        handleCloseConfirm();
      })
      .catch((err) => console.log(err));

    setDate("");
    setDepart("");
    setName("");
    setObjective("");
    setPlace("");
    setStartTime("");
    setEndTime("");
    setPassengers("");
  }

  return (
    <div className="Dver__page">
      <div className="Box">
        <h1 className="H1">กรุณากรอกข้อมูลให้ครบถ้วน</h1>
        <div className="date__box">
          <div className="input__margin_1">
            <p className="P">วันที่บันทึกการจอง - วันที่ใช้งานรถ</p>
            <div className="date__box_1">
              <div className="input__margin_1">
                <TextField
                  color="primary"
                  fullWidth
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="input__margin_1">
                <TextField
                  color="primary"
                  fullWidth
                  type="date"
                  value={enddate}
                  onChange={(e) => setEnddate(e.target.value)}
                />
              </div>
            </div>
            <p className="P">รถ-ทะเบียน</p>
            <Select fullWidth value={cars} onChange={(e) => setCars(e.target.value)}>
              {carList.map((caritem) => (
                <MenuItem key={caritem.plate} value={caritem.plate}>{`${caritem.type} ทะเบียน : ${caritem.plate} `}</MenuItem>
              ))}
            </Select>
          </div>
          <div className="input__margin_1">
            <p className="P">เวลาเริ่มใช้รถ - เวลาสิ่นสุดการใช้รถ</p>
            <div className="time__box">
              <div className="input__margin_1">
                <TextField
                  color="primary"
                  fullWidth
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="input__margin_1">
                <TextField
                  color="primary"
                  fullWidth
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <p className="P">ผู้ขับรถ</p>
            <Select labelId="L1" id="L1" fullWidth value={driver} onChange={(e) => setDriver(e.target.value)}>
              {departmentList.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="Text__ip">
          <div className="input__margin">
            <TextField
              label="แผนก"
              color="primary"
              fullWidth
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
            />
          </div>
          <div className="input__margin">
            <TextField
              label="ผู้จอง"
              color="primary"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input__margin">
            <TextField
              label="จำนวนผู้โดยสาร"
              type="number"
              color="primary"
              fullWidth
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
            />
          </div>
          <div className="input__margin">
            <TextField
              label="สถานที่"
              multiline
              fullWidth
              rows={1}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className="input__margin">
            <TextField
              label="วัตถุประสงค์ในการใช้รถ"
              multiline
              fullWidth
              rows={2}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>
        </div>
        <div className="confirm">
          <Button variant="contained" startIcon={<SaveSharpIcon />} onClick={handleOpenConfirm}>
            ตกลง
          </Button>
          <div className="back__01">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="contained" startIcon={<CloseTwoToneIcon />} color="warning">
                ยกเลิก
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>{"ยืนยันข้อมูลการจอง"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            **กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยัน:**
            <br />
            <br />
            วันที่:  {date} ถึง {enddate}
            <br />
            เวลา:  {startTime} ถึง {endTime}
            <br />
            รถ-ทะเบียน:  {cars}
            <br />
            ผู้ขับรถ:  {driver}
            <br />
            ผู้จอง: {name} ({depart})
            <br />
            จำนวนผู้โดยสาร:  {passengers}
            <br />
            สถานที่:  {place}
            <br />
            วัตถุประสงค์:  {objective}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="warning">
            ยกเลิก
          </Button>
          <Button onClick={handleConfirmAndSubmit} color="primary" autoFocus>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Driver;