import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BookingReport.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import axios from "../../axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import * as dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale

// Set Day.js locale to Thai
dayjs.locale("th");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2c3e50",
    color: theme.palette.common.white,
    fontWeight: 600,
    fontSize: 16,
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "12px 16px",
    whiteSpace: "normal",
    verticalAlign: "top",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9f9f9",
  },
  "&:hover": {
    backgroundColor: "#e8f5e9",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
}));

const BookingReport = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name"); // New state for search scope

  useEffect(() => {
    axios
      .get("schedule")
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        setData(sortedData);
      })
      .catch((err) => console.log(err));
  }, []);
console.log(data)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const term = searchTerm.toLowerCase();

    // Determine which field to filter based on the `filterBy` state
    if (filterBy === "startDate") {
      const formattedDate = dayjs(item.startDate).format("DD-MM-YYYY");
      return formattedDate.includes(term);
    }
    if (filterBy === "department") {
      return item.department.toLowerCase().includes(term);
    }
    // Default to 'name'
    return item.name.toLowerCase().includes(term);
  });

  return (
    <div className="background___page">
      <div className="header__container">
        <h1>รายงานการจองรถ</h1>
        <div className="search__container">
          <select value={filterBy} onChange={handleFilterChange} className="filter__select">
            <option value="name">ผู้จอง</option>
            <option value="department">แผนก</option>
            <option value="startDate">วันที่จอง</option>
          </select>
          <input
            type="text"
            placeholder="ค้นหา..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search__input"
          />
        </div>
      </div>
      <div className="BOX">
        <TableContainer component={Paper} className="MuiTableContainer-root">
          <Table aria-label="customized table" className="MuiTable-root">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ลำดับที่</StyledTableCell>
                <StyledTableCell align="right">วันที่บันทึกการจอง</StyledTableCell>
                <StyledTableCell align="right">วันที่ใช้รถ</StyledTableCell>
                <StyledTableCell align="right">เวลาเรื่มใช้รถ</StyledTableCell>
                <StyledTableCell align="right">เวลากลับคืนรถ</StyledTableCell>
                <StyledTableCell align="right">รถ-ทะเบียน</StyledTableCell>
                <StyledTableCell align="right">ผู้ขับรถ</StyledTableCell>
                <StyledTableCell align="right">ผู้จอง</StyledTableCell>
                <StyledTableCell align="right">จำนวนผู้โดยสาร</StyledTableCell>
                <StyledTableCell align="right">แผนก</StyledTableCell>
                <StyledTableCell align="right">วัตถุประสงค์ที่ใช้รถ</StyledTableCell>
                <StyledTableCell align="right">สถานที่ปลายทาง</StyledTableCell>
                <StyledTableCell align="right">สถานะคำร้อง</StyledTableCell>
                <StyledTableCell align="right">ผู้อนุมัติ</StyledTableCell>
                <StyledTableCell align="right">เลขไมล์รถก่อนเดินทาง</StyledTableCell>
                <StyledTableCell align="right">เลขไมล์รถหลังเดินทางกลับ</StyledTableCell>
                <StyledTableCell align="right">หมายเหตุ</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="right">
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
                    <StyledTableCell align="right">{item.cars}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.driver_name ? item.driver_name : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.name}</StyledTableCell>
                    <StyledTableCell align="right">
                      {item.passenger_count ? item.passenger_count : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.department}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.objective}
                    </StyledTableCell>
                    <StyledTableCell align="right">{item.place}</StyledTableCell>
                    <StyledTableCell align="right">{item.status}</StyledTableCell>
                    <StyledTableCell align="center">
                      {item.approve ? item.approve : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.startMileage ? item.startMileage : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.endMileage ? item.endMileage : "-"}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.note ? item.note : "-"}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={18} align="center">
                    ไม่พบข้อมูลที่ค้นหา
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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

export default BookingReport;