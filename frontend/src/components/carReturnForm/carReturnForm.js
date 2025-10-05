import React, { useEffect, useState } from "react";
import "./CarReturnForm.css"; // นำเข้าไฟล์ CSS
import { MenuItem, Select } from "@mui/material";
import axios from "../../axios";

// สมมติว่ามีเลขไมล์ตอนยืมรถเก็บไว้ในระบบ
// ในการใช้งานจริง คุณจะดึงค่านี้มาจากฐานข้อมูล เช่น จาก API
const initialMileage = 1000; // ตัวอย่างเลขไมล์ตอนยืมรถ

const CarReturnForm = () => {
  // สร้าง state เพื่อเก็บข้อมูลจากฟอร์ม
  const [returnDetails, setReturnDetails] = useState({
    mileage: "",
    returnerName: "",
    carPhoto1: null, // รูปภาพที่ 1
    carPhoto2: null, // รูปภาพที่ 2
  });
  const [data, setData] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [endmileage, setEndMileage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("schedule")
      .then((res) => {
        const sortedData = res.data.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
        const filteredData = sortedData.filter(
          (item) => item.status === "อนุมัติคำร้อง"
        );
        setSortedData(filteredData);
      })
      .catch((err) => console.log(err));
  }, []);

  

  // สร้าง state สำหรับข้อความแจ้งเตือนข้อผิดพลาด
  const [error, setError] = useState("");

  // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงข้อมูลในช่อง input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setError(""); // เคลียร์ error เมื่อผู้ใช้เริ่มกรอกใหม่

    console.log();

    if (name.startsWith("carPhoto")) {
      // ตรวจสอบว่าเป็นการอัปโหลดรูปภาพ
      setReturnDetails({
        ...returnDetails,
        [name]: files[0], // เก็บไฟล์รูปภาพที่เลือก
      });
    } else {
      setReturnDetails({
        ...returnDetails,
        [name]: value,
      });
    }
  };

  // ฟังก์ชันสำหรับจัดการเมื่อกดปุ่ม "ยืนยันการคืนรถ"
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. ตรวจสอบเงื่อนไขการกรอกเลขไมล์

    if (isNaN(endmileage)) {
      setError("กรุณากรอกเลขไมล์กลับเป็นตัวเลขเท่านั้น");
      return;
    }

    if (endmileage < initialMileage) {
      setError(
        `เลขไมล์กลับ (ปัจจุบัน ${endmileage}) ต้องมากกว่าเลขไมล์ตอนยืม (${initialMileage})`
      );
      return;
    }

    // 2. ตรวจสอบเงื่อนไขการอัปโหลดรูปภาพ
    if (!returnDetails.carPhoto1 || !returnDetails.carPhoto2) {
      setError("กรุณาอัปโหลดรูปภาพรถให้ครบทั้ง 2 ภาพ");
      return;
    }

    // ถ้าผ่านเงื่อนไขทั้งหมด
    console.log("ข้อมูลการคืนรถ:", returnDetails);
    console.log("ข้อมูลที่ผ่านการตรวจสอบแล้ว:", {
      ...returnDetails,
      endmileage: endmileage,
      carPhoto1: returnDetails.carPhoto1 ? returnDetails.carPhoto1.name : null,
      carPhoto2: returnDetails.carPhoto2 ? returnDetails.carPhoto2.name : null,
    });

    const body = {
      id: data.id,
      endmileage:endmileage,
      name: name,
      startMileage:data.startMileage
    }
    axios
      .put(`/schedule/mile/${data.id}`,body)
      .then(() => {
        alert("บันทึกข้อมูลสำเร็จ")
      })
      .catch((err) => console.log(err));

    console.log(body,"111")

    // รีเซ็ตฟอร์มหลังจากส่งข้อมูลสำเร็จ
    setReturnDetails({
      mileage: "",
      returnerName: "",
      carPhoto1: null,
      carPhoto2: null,
    });
    setName("");
    setEndMileage("");
    setData("")
  };
console.log(data,"xx")
  return (
    <div className="return-car-container">
      <h2 className="form-title">แบบฟอร์มคืนรถ</h2>
      <form onSubmit={handleSubmit} className="return-car-form">
        <div className="form-group">
          <label htmlFor="mileage">กรุณาเลือกรายการที่ต้องการคืน:</label>
          <Select
            fullWidth
            value={data}
            onChange={(e) => setData(e.target.value)}
          >
            {sortedData.map((listItem) => (
              <MenuItem
                key={listItem.plate}
                value={listItem}
              >{`ผู้จอง: ${listItem.name} แผนก: ${listItem.department} ทะเบียนรถ: ${listItem.cars} `}</MenuItem>
            ))}
          </Select>

          <label htmlFor="mileage">เลขไมล์ไป:</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={data?.startMileage??"-"}
            required
            placeholder="กรอกเลขไมล์ล่าสุด"
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="mileage">เลขไมล์กลับ:</label>
          <input
            type="number"
            id="mileage"
            name="mileage"
            value={endmileage}
            onChange={(e) => setEndMileage(e.target.value)}
            required
            placeholder="กรอกเลขไมล์ล่าสุด"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="returnerName">ชื่อผู้คืน:</label>
          <input
            type="text"
            id="returnerName"
            name="returnerName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="ชื่อ-นามสกุล ผู้คืนรถ"
          />
        </div>

        {/* ช่องอัปโหลดรูปภาพที่ 1 */}
        <div className="form-group photo-upload-group">
          <label htmlFor="carPhoto1">อัปโหลดรูปภาพรถก่อนไป:</label>
          <input
            type="file"
            id="carPhoto1"
            name="carPhoto1"
            accept="image/*"
            onChange={handleChange}
            required
          />
          {returnDetails.carPhoto1 && (
            <div className="image-preview-wrapper">
              <p className="file-name">
                ไฟล์ที่เลือก: {returnDetails.carPhoto1.name}
              </p>
              <img
                src={URL.createObjectURL(returnDetails.carPhoto1)}
                alt="Car Preview 1"
                className="image-preview"
              />
            </div>
          )}
        </div>

        {/* ช่องอัปโหลดรูปภาพที่ 2 */}
        <div className="form-group photo-upload-group">
          <label htmlFor="carPhoto2">อัปโหลดรูปภาพรถหลักกลับ:</label>
          <input
            type="file"
            id="carPhoto2"
            name="carPhoto2"
            accept="image/*"
            onChange={handleChange}
            required
          />
          {returnDetails.carPhoto2 && (
            <div className="image-preview-wrapper">
              <p className="file-name">
                ไฟล์ที่เลือก: {returnDetails.carPhoto2.name}
              </p>
              <img
                src={URL.createObjectURL(returnDetails.carPhoto2)}
                alt="Car Preview 2"
                className="image-preview"
              />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          ยืนยันการคืนรถ
        </button>
      </form>
    </div>
  );
};

export default CarReturnForm;
