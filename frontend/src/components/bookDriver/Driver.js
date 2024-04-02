import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import "./Driver.css";
import axios from "../../axios";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useHistory } from "react-router-dom";
const Driver = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [cars, setCars] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [depart, setDepart] = useState("");
  const [name, setName] = useState("");
  const [driver, setDriver] = useState("");
  const [objective, setObjective] = useState("");
  const [place, setPlace] = useState("");
  const [enddate, setEnddate] = useState("");
  const history = useHistory();
  const [carList, setCarList] = useState([]);

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
    const providedTime = new Date(time);

    const currentTime = new Date();

    const timeDifference = currentTime - providedTime;

    const hoursDifference = timeDifference / (1000 * 60 * 60);

    return hoursDifference > 1;
  }

  function handleClick() {
    history.push("/bookingReport");
  }
  function submit() {
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
    };
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
        driver
      )
    ) {
      console.log("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      axios
        .post("/schedule", post)
        .then(() => {
          handleClick();
        })
        .catch((err) => console.log(err));

      setDate("");
      setDepart("");
      setName("");
      setObjective("");
      setPlace("");
      setStartTime("");
      setType("");
      setEndTime("");
      console.log(post);
    }
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
            <Select
              fullWidth
              value={cars}
              onChange={(e) => setCars(e.target.value)}
            >
              {carList.map((caritem) => (
                <MenuItem
                  value={caritem.plate}
                >{`${caritem.type} ทะเบียน : ${caritem.plate} `}</MenuItem>
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
            <Select
              labelId="L1"
              id="L1"
              fullWidth
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
            >
              {departmentList.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
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
              label="ผู้บันทึก"
              color="primary"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input__margin">
            <TextField
              label="สถานที่ปลายทาง"
              multiline
              fullWidth
              rows={1}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className="input__margin">
            <TextField
              label="วัดถุประสงค์ในการใช้รถ"
              multiline
              fullWidth
              rows={2}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>
        </div>

        <div className="confirm">
          <Button
            variant="contained"
            startIcon={<SaveSharpIcon />}
            onClick={submit}
          >
            ตกลง
          </Button>

          <div className="back__01">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                startIcon={<CloseTwoToneIcon />}
                color="warning"
              >
                ยกเลิก
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* <Link to="/">
        <div className="Btn__back">
          <Button variant="contained" startIcon={<ArrowBackIosIcon />}>
            ย้อนกลับ
          </Button>
        </div>
      </Link> */}
    </div>
  );
};

export default Driver;
