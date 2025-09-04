import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";
import { FaCar, FaCheckCircle, FaClipboardList, FaSpinner } from 'react-icons/fa'; // Icons from react-icons

// ข้อมูลสำหรับกราฟ
const chartData = [
  ["สายงาน", "เดือนที่แล้ว", "เดือนล่าสุด"],
  ["สายงานภัยพิบัติ", 30, 25],
  ["สายงานบริหารสำนักงาน", 10, 8],
  ["สายงานสำนักผู้จัดการ", 20, 12],
  ["สายการพัฒนาความยั่งยืน", 55, 35],
  ["ร้านค้า", 10, 25],
];

// Options สำหรับกราฟ
const chartOptions = {
  title: "สถิติรายการจองของแต่ละสายงาน",
  titleTextStyle: { fontSize: 24, fontWeight: "bold" },
  legend: { textStyle: { fontSize: 14 } },
  chartArea: { width: "70%" },
  vAxis: { textStyle: { fontSize: 16 } },
  hAxis: { textStyle: { fontSize: 14 } },
  colors: ['#007bff', '#28a745'],
  bar: { groupWidth: '80%' }
};

// Component สำหรับ Summary Card (ตัวแสดงผลรวม)
const SummaryCard = ({ title, value, icon, className }) => {
  return (
    <div className={`summary-card ${className}`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-value">{value}</p>
      </div>
    </div>
  );
};

// Component สำหรับ Navigation Button
const NavButton = ({ title, to, icon }) => {
  return (
    <Link to={to} className="nav-button">
      <div className="button-icon">{icon}</div>
      <span className="button-text">{title}</span>
    </Link>
  );
};

const HomePage = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="header-title">ระบบจองรถสำนักงาน</h1>
      </header>

      <nav className="dashboard-nav">
        <NavButton title="จองรถ" to="/driver" icon={<FaCar />} />
        <NavButton title="อนุมัติ" to="/profile" icon={<FaCheckCircle />} />
        <NavButton title="รายการจอง" to="/bookingReport" icon={<FaClipboardList />} />
        <NavButton title="คืนรถ" to="/carReturnForm" icon={<FaCar />} />
      </nav>

      <main className="dashboard-main">
        <div className="summary-cards-section">
          <SummaryCard 
            title="จำนวนรถที่ว่าง" 
            value="5 คัน" 
            icon={<FaCar size={40} />} 
            className="card-available" 
          />
          <SummaryCard 
            title="การจองทั้งหมด" 
            value="50 ครั้ง" 
            icon={<FaClipboardList size={40} />} 
            className="card-total" 
          />
          <SummaryCard 
            title="รออนุมัติ" 
            value="1 รายการ" 
            icon={<FaSpinner size={40} />} 
            className="card-pending" 
          />
        </div>

        <div className="charts-section">
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={chartData}
            options={chartOptions}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;