import React, { useState, useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Profile.css";
import axios from "../../axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MenuItem, Select, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import * as dayjs from "dayjs";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

const Profile = () => {
  const [data, setData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("12345");
  const [password, setPassword] = useState("12345");
  const ID = "";
  const PASSWORD = "";
  const [open, setOpen] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [approve, setApprove] = useState("");
  const [reject, setReject] = useState("");
  const [item, setItem] = useState("");
  const [deleteItem, setDeleteItem] = useState({});
  const [warning, setWarning] = useState(false);
  const [validate, setValidate] = useState(false);
  const [employee, setEmployee] = useState();
  const [employeeList, setEmployeeList] = useState([]);

  const handleRejectDialogOpen = (item) => {
    setRejectDialog(true);
    setDeleteItem(item);
  };

  const handleRejectDialogClose = () => {
    setRejectDialog(false);
    setDeleteItem("");
  };

  const handleClickOpen = (item) => {
    setOpen(true);
    setItem(item);
    console.log(item.driver, "5555");
  };

  const handleClose = () => {
    setOpen(false);
    setItem("");
  };

  function handleKeyPress() {
    if (ID === username && password === PASSWORD) {
      setIsAdmin(true);
    }
  }
  function login() {
    if (ID === username && password === PASSWORD) {
      setIsAdmin(true);
    }
  }

  function returncar(item) {
    const data = {
      cars: item.cars,
      id: item.id,
    };
    if (window.confirm("ยืนยันคืนรถหรือไม่")) {
      axios
        .post("cars/time", data)
        .then((res) => loadlist())
        .catch((err) => console.log(err));
    }
  }

  async function deleteData(item) {
    const data = { reason: reject, name: item.name };
    if (reject !== "") {
      await axios.put(`/schedule/${item.id}`, { data: data });

      await loadlist();
      setValidate(false);
      setReject("");
      handleRejectDialogClose();
    } else {
      setValidate(true);
    }
  }

  async function approveData(item) {
    const data = {
      status: "อนุมัติคำร้อง",
      approve: approve,
      department: item.department,
      name: item.name,
      type: item.type,
      employee: employee,
      cars: item.cars,
    };
    console.log(item, "023");

    if (approve !== "") {
      const edit = await axios
        .put(`/schedule/${item.id}`, data)
        .then(() => console.log("อนุมัติ"))
        .catch((err) => console.log(err));
      await loadlist();
      setWarning(false);
      setApprove("");
      handleClose();
      console.log({ edit });
    } else {
      setWarning(true);
    }
  }

  async function loadlist() {
    const list = await axios.get("/schedule");
    if (list?.data?.lenght <= 0) {
      setData([]);
      return;
    }

    // const filterData = list.data.filter((item) => item.status == "รอดำเนินการ");
    setData(list.data);
  }
  useEffect(() => {
    loadlist();
  }, []);

  useEffect(() => {
    axios
      .get("employee")
      .then((res) => setEmployeeList(res.data))
      .catch((err) => console.log(err));
  }, []);
  console.log(employee, "รอก");

  return (
    <div className="profile__page">
      <Link to="/">
        <div className="Btn__back">
          <Button variant="contained" startIcon={<ArrowBackIosIcon />}>
            ย้อนกลับ
          </Button>
        </div>
      </Link>
      {isAdmin === false ? (
        <div className="Box__Admin">
          <div className="Login">
            <h1>กรุณากรอกรหัส</h1>
            <div className="Cl">
              <TextField
                label="username"
                color="primary"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="Cl">
              <TextField
                label="password"
                color="primary"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                onKeyPress={(e) => handleKeyPress(e)}
              />
            </div>
            <div className="Cl">
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={login}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="BOX__Book">
          <div className="BOX">
            <div className="table__right">
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="right">
                        วันที่บันทึกการจอง
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        วันที่ใช้งาน
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        เวลาเรื่มใช้งาน
                      </StyledTableCell>
                      <StyledTableCell align="right">เวลาคืนรถ</StyledTableCell>
                      <StyledTableCell align="right">
                        รถ-ทะเบียน
                      </StyledTableCell>
                      <StyledTableCell align="right">ผู้ขับรถ</StyledTableCell>
                      <StyledTableCell align="right">ผู้บันทึก</StyledTableCell>
                      <StyledTableCell align="right">แผนก</StyledTableCell>
                      <StyledTableCell align="right">
                        วัดถุประสงค์ที่ใช้รถ
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        สถานที่ปลายทาง
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        สถานะคำร้อง
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        ผู้อนุมัติ
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        ปฏิเสธคำขอ
                      </StyledTableCell>
                      <StyledTableCell align="right">หมายเหตุ</StyledTableCell>
                      <StyledTableCell align="right">
                        สถานะคืนรถ
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item) => (
                      <>
                        <StyledTableRow key={item.id}>
                          <StyledTableCell component="th" scope="row">
                            {dayjs(item.startDate).format("DD-MM-YYYY")}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {dayjs(item.endDate).format("DD-MM-YYYY")}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.startTime}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.endTime}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.cars}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.driver}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.department}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.objective}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.place}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {item.status}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              disabled={
                                item.status === "รอดำเนินการ" ? false : true
                              }
                              variant="contained"
                              startIcon={<ContentPasteIcon />}
                              color="primary"
                              onClick={() => handleClickOpen(item)}
                            >
                              ลงชื่อผู้อนุมัติ
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              disabled={
                                item.status === "รอดำเนินการ" ? false : true
                              }
                              variant="contained"
                              startIcon={<DeleteIcon />}
                              color="warning"
                              onClick={() => handleRejectDialogOpen(item)}
                            >
                              ปฏิเสธ
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.reason ? item.reason : "-"}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Button
                              disabled={
                                item.is_return_car === 1 ||
                                item.status === "รอดำเนินการ"
                                  ? true
                                  : false
                              }
                              variant="contained"
                              startIcon={<AssignmentTurnedInIcon />}
                              color="success"
                              onClick={() => returncar(item)}
                            >
                              คืนรถ
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"กรุณากรอกชื่อผู้อนุมัติ"}
        </DialogTitle>
        <DialogContent>
          {warning === true ? (
            <p style={{ color: "red" }}>กรุณากรอกข้อมูล</p>
          ) : null}

          <TextField
            color="primary"
            fullWidth
            label="ลงชื่อผู้อนุมติ"
            value={approve}
            onChange={(e) => setApprove(e.target.value)}
          />
          {item.driver === "เลือกคนขับ" ? (
            <div>
              <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                เลือกคนขับ
              </p>
              <Select
                fullWidth
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
              >
                {employeeList.map((xxx) => (
                  <MenuItem
                    value={xxx}
                  >{` ชื่อผู้ขับ : ${xxx.name} `}</MenuItem>
                ))}
              </Select>
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => approveData(item)}>อนุมัติคำขอ</Button>
          <Button onClick={handleClose}>ปิดหน้าต่าง</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={rejectDialog}
        onClose={handleRejectDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"ปฏิเสธคำขอ"}</DialogTitle>
        <DialogContent>
          {validate === true ? (
            <p style={{ color: "red" }}>กรุณากรอกข้อมูล</p>
          ) : null}
          <TextField
            color="primary"
            fullWidth
            label="เหตุผลที่ปฏิเสธคำขอ"
            value={reject}
            onChange={(e) => setReject(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteData(deleteItem)}>ยืนยัน</Button>
          <Button onClick={handleRejectDialogClose}>ปิดหน้าต่าง</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
