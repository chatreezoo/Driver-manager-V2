import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaCheckCircle,
  FaClipboardList,
  FaSpinner,
} from "react-icons/fa";
import axios from "../../axios";

// Component สำหรับ Summary Card
const SummaryCard = ({ title, icon, className, children }) => {
  return (
    <div className={`summary-card ${className}`}>
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {children}
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
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios
      .get("cars")
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        const filteredData = sortedData.filter(
          (item) => item.status === "ว่าง"
        );
        console.log(sortedData);
        setData(filteredData);
      })
      .catch((err) => console.log(err, "555555"));
  }, []);

  const pendingRequestsDetails = [
    {
      id: 1,
      name: "คุณสมชาย",
      dept: "บัญชี",
      license: "นจ 1122",
      status: "อนุมัติ",
    },
    {
      id: 2,
      name: "คุณสุชาดา",
      dept: "บุคคล",
      license: "กท 9876",
      status: "รออนุมัติ",
    },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="header-title">ระบบจองรถสำนักงาน</h1>
      </header>

      <nav className="dashboard-nav">
        <NavButton title="จองรถ" to="/driver" icon={<FaCar />} />
        <NavButton title="อนุมัติ" to="/profile" icon={<FaCheckCircle />} />
        <NavButton
          title="รายการจอง"
          to="/bookingReport"
          icon={<FaClipboardList />}
        />
        <NavButton title="คืนรถ" to="/carReturnForm" icon={<FaCar />} />
      </nav>

      <main className="dashboard-main">
        <div className="summary-cards-section">
          <SummaryCard
            title={`รถที่ว่าง (${data.length} คัน)`}
            icon={<FaCar size={40} />}
            className="card-available"
          >
            {data.length > 0 ? (
              <table className="car-table">
                <thead>
                  <tr>
                    <th>ยี่ห้อ</th>
                    <th>ทะเบียน</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((car) => (
                    <tr key={car.id}>
                      <td>{car.type}</td>
                      <td>{car.plate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>ไม่มีรถว่างในขณะนี้</p>
            )}
          </SummaryCard>

          {/* Updated "Pending Approval" card to show a table */}
          <Link to="/approveTable">
            <SummaryCard
              title={`รายการอนุมัติแล้ว (${pendingRequestsDetails.length} รายการ)`}
              icon={<FaSpinner size={40} />}
              className="card-pending"
            >
              {pendingRequestsDetails.length > 0 ? (
                <table className="request-table">
                  <thead>
                    <tr>
                      <th>ชื่อผู้จอง</th>
                      <th>แผนก</th>
                      <th>ทะเบียนรถ</th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequestsDetails.map((request) => (
                      <tr key={request.id}>
                        <td>{request.name}</td>
                        <td>{request.dept}</td>
                        <td>{request.license}</td>
                        <td>
                          <span className="status pending">
                            {request.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>ไม่มีรายการรออนุมัติในวันนี้</p>
              )}
            </SummaryCard>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
