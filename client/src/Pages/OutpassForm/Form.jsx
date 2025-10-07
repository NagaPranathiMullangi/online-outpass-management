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

  const [room, setRoom] = useState("");
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
    /* FormData is a special object that stores key-value pairs.
It is not a plain object or array, but it behaves like 
a collection of key-value pairs.
You can access its data using methods like entries(), get(), or forEach().
directly cant print the formData

The FormData object is used to send both text fields
 and files in a multipart/form-data format.
*/
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
          <input
            type="text"
            name="fname"
            value={User.result.name}
            className="inp fname"
            required
            disabled
          />
          <input
            type="text"
            name="enroll"
            value={User.result.enrollment}
            className="inp enr"
            required
            disabled
          />
          <input
            type="text"
            name="room"
          value={room}
            placeholder="Room Number"
            className="inp room"
            onChange={(e) => setRoom(e.target.value)}
            required
          />
          <input
            type="number"
            name="days"
           //value={duration}
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
              value={fromDate}
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
              value={toDate}
              placeholder="To"
              className="inp date"
              onChange={(e) => setToDate(e.target.value)}
              required
            />
          </label>
          <input
            type="text"
            name="hostel"
            value={User.result.hostel}
            className="inp hostel-no"
            disabled
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose of Leave"
            value={purpose}
            className="inp purpose"
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
          <input
            type="text"
            name="adress"
            value={address}
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
              accept=".png, .jpg, .jpeg, .pdf" // this checks only file extensions not actual type
              className="file"
              onChange={(e) =>
              {
                const file = e.target.files[0];
      const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

      if (!file) {
        alert("Please select a file.");
        return;
      }

      // Validate MIME type
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a PNG, JPG, or PDF file.");
        e.target.value = ""; // Reset the input value
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds the 5 MB limit.");
        e.target.value = ""; // Reset the input value
        return;
      }

      // If all validations pass, set the file
      setConsentFile(file);
              }
               
              } /* e.target.files is filelist object if multiple 
               FileList { 
                0: File {name: "photo1.jpg", size: 120000, type: "image/jpeg"},
                1: File {name: "photo2.png", size: 98000, type: "image/png"},
                length: 2
              }*/
              //multiple not given know then only it allows one file to upload
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
