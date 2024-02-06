import React from "react";
import BoxPage from "./BoxPage";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home__page">
      <h1 className="H1" >มูลนิธิอาสาเพื่อนพึ่ง(ภาฯ) ยามยาก สภากาชาดไทย</h1>
      <div className="container__home">
        <div className="box__top">
          <Link to="/driver" style={{ textDecoration: "none" }}>
            <BoxPage title="จองรถ" />
          </Link>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <BoxPage title="จัดการตารางจอง" />
          </Link>
        </div>
        <div className="box__buttom">
          <Link to="/bookingReport" style={{ textDecoration: "none" }}>
            <BoxPage title="รายการจอง" />
          </Link>
          <Link to="/Contact" style={{ textDecoration: "none" }}>
            <BoxPage title="ติดต่อเรา" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
