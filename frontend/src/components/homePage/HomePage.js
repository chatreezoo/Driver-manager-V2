import React from "react";
import BoxPage from "./BoxPage";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";

const data = [
  ["สถิติ", "เดือนที่แล้ว","เดือนล่าสุด"],
  ["สายงานภัยพิบัติ", 30, 25],
  ["สายงานบริหารสำนักงาน", 10, 8],
  ["สายงานสำนักผู้จัดการ", 20, 12],
  ["สายการพัฒนาความยั่งยืน", 85, 35],
  ["ร้านค้า", 100, 25],
];

const options = {
  title: "สถิติรายการจองของแต่ละสายงาน",
  titleTextStyle: { fontSize: 28 },
  legend: { textStyle: { fontSize: 14 } },
  chartArea: { width: " 65%" },
  vAxis: { textStyle: { fontSize: 18 } },
  colors: ['#CC00FF','#FF6633']
};

const HomePage = () => {
  return (
    <div className="home__page">
      <h1 className="H1">ระบบจองรถสำนักงาน</h1>
      {/* <div className="roporttest" >dki</div> */}
      <div className="container__home">
        <div className="p">
          <div className="box__top">
            <Link to="/driver" style={{ textDecoration: "none" }}>
              <BoxPage title="จองรถ" />
            </Link>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <BoxPage title="อนุมัติ" />
            </Link>
            <Link to="/bookingReport" style={{ textDecoration: "none" }}>
              <BoxPage title="รายการจอง" />
            </Link>
            <Link to="/bookingReport" style={{ textDecoration: "none" }}>
              <BoxPage title="คืนรถ" />
            </Link>
            <Link to="/Contact" style={{ textDecoration: "none" }}>
              <BoxPage title="ติดต่อเรา" />
            </Link>
          </div>
          <div>
          <Chart
            // Bar is the equivalent chart type for the material design version.
            chartType="BarChart"
            width="900px"
            height="100%"
            data={data}
            options={options}
          />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default HomePage;
