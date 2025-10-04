import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "./Form.css";
import StudentNavbar from "../../Components/Navbar/StudentNavbar";
import { createOutpass } from "../../actions/outpass";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem("Profile"));

  const [room, setRoom] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [purpose, setPurpose] = useState("");
  const [address, setAddress] = useState("");
  const [consentFile, setConsentFile] = useState(null); // State for storing the file

  const generateUniqueId = () => {
    return uuidv4();
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const outpassId = generateUniqueId();

    // Create FormData to handle file and other inputs
    const formData = new FormData();
    formData.append("name", User.result.name);
    formData.append("enrollment", User.result.enrollment);
    formData.append("room", room);
    formData.append("duration", duration);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("hostel", User.result.hostel);
    formData.append("purpose", purpose);
    formData.append("address", address);
    formData.append("outpassId", outpassId);
    formData.append("image", consentFile); // Attach the file

    dispatch(createOutpass(formData, navigate));
  };

  return (
    <div className="form">
      <div className="bimage"></div>
      <div className="nav-bar">
        <StudentNavbar />
      </div>
      <div className="form-box">
        <form className="outpass-form" onSubmit={handleApply}>
          <p className="form-text">Fill out this form to apply for outpass</p>
          <input type="text" name="fname" value={User.result.name} className="inp fname" required disabled />
          <input type="text" name="enroll" value={User.result.enrollment} className="inp enr" required disabled />
          <input
            type="number"
            name="room"
            placeholder="Room Number"
            className="inp room"
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <input
            type="number"
            name="days"
            placeholder="Duration"
            className="inp days"
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <label htmlFor="from" className="from">
            From:
            <input
              type="date"
              id="from"
              name="from"
              placeholder="From"
              className="inp date"
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
          </label>
          <label htmlFor="to" className="to">
            To:
            <input
              type="date"
              id="to"
              name="to"
              placeholder="To"
              className="inp date"
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </label>
          <input type="text" name="hostel" value={User.result.hostel} className="inp hostel-no" disabled />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose of Leave"
            className="inp purpose"
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
          <input
            type="text"
            name="adress"
            placeholder="Address on Leave"
            className="inp address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="consent" className="consent">
            Parent Consent:
            <input
              type="file"
              id="consent"
              name="image"
              accept=".png, .jpg, .jpeg, .pdf"
              className="file"
              onChange={(e) => setConsentFile(e.target.files[0])} // Capture the file
              required
            />
          </label>
          <input type="submit" value="Apply" name="apply" className="sub-btn" />
        </form>
      </div>
    </div>
  );
};

export default Form;
