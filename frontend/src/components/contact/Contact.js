import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import SaveSharpIcon from "@mui/icons-material/SaveSharp";

const Contact = () => {
  const [name, setName] = useState("");
  const [surName, setSurname] = useState("");
  const [depart, setDepart] = useState("");
  const [email, setEmail] = useState("");
  const [report, setReport] = useState("");

  function submit() {
    const data = {
      name: name,
      surName: surName,
      depart: depart,
      email: email,
      report: report,
    };
    if (!(name && depart && email && depart && surName)) {
      console.log("กรุณากรอกข้อมูลให้ครบถ้วน");
    } else {
      console.log(data);
      setName("");
      setDepart("");
      setEmail("");
      setSurname("");
      setReport("");
    }
  }

  return (
    <div className="background___page">

      <div className="Box__CT">
      <h1>ติดต่อเรา</h1>
        <div className="Text__Box">
          <div className="Box__contact">
            <TextField
              label="ชื่อ-นามสกุล"
              multiline
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="Box__contact">
            <TextField
              label="แผนก"
              multiline
              fullWidth
              value={depart}
              onChange={(e) => setDepart(e.target.value)}
            />
          </div>
          <div className="Box__contact">
            <TextField
              label="อีเมล์"
              multiline
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Box__contact">
            <TextField
              label="รายงานปัญหา"
              multiline
              fullWidth
              onChange={(e) => setReport(e.target.value)}
            />
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
      </div>

      <Link to="/">
        <div className="Btn__back">
          <Button variant="contained" startIcon={<ArrowBackIosIcon />}>
            ย้อนกลับ
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default Contact;
