import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import "./Auth.css";
import {
  wardenLogIn,
  wardenSignUp,
  wardenVerification,
} from "../../actions/auth";

const Warden = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [employee, setEmployee] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hostel, setHostel] = useState([""]);
  const [otp, setOtp] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleWardenLogin = (e) => {
    e.preventDefault();
    dispatch(wardenLogIn({ employee, password }, navigate));
  };

  const handleWardenRegister = async (e) => {
    e.preventDefault();
    const isValidDomain = email.endsWith("@gmail.com");
    if (!isValidDomain) {
      toast.error("Invalid email, please enter your clg email Id");
      return;
    }
    const response = await dispatch(wardenVerification({ employee, email }));
    if (response) {
      setIsSubmitted(true);
    }
  };

  const handleOtpSubmitted = (e) => {
    e.preventDefault();
    dispatch(
      wardenSignUp({ name, employee, email, password, hostel, otp }, navigate)
    );
  };

  const handleHostelChange = (selectedOptions) => {
    setSelectedOption(selectedOptions);
    const selectedHostels = selectedOptions.map((option) => option.value);
    setHostel(selectedHostels);
  };

  const options = [
    { value: "GH-1", label: "GH-1" },
    { value: "GH-2", label: "GH-2" },
    { value: "BH-1", label: "BH1-" },
    { value: "BH-2", label: "BH-2" },
    { value: "OC-G", label: "OC-G" },
    { value: "OC-B", label: "OC-B" },
  ];

  return (
    <div className="person">
      <div className="bimage"></div>
      <div className="auth">
        <h1>Welcome</h1>
        <h2>Please Login Using Your Website Credentials</h2>
      </div>
      <div className="auth-container">
        {isSubmitted ? (
          <div className="auth-container-otp">
            <h2>Email Verification</h2>
            <div className="otp-box">
              <p>Please check your email id and enter the OTP</p>
              <form onSubmit={handleOtpSubmitted}>
                <input
                  type="number"
                  name="otp"
                  placeholder="Enter the OTP"
                  className="auth-inp otp-inp"
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  required
                />
                <input
                  type="submit"
                  value="Verify"
                  className="auth-btn otp-btn"
                />
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="auth-container-2">
              <p>Already Registered? Login Now</p>
              <div className="auth-box">
                <form className="auth-2" onSubmit={handleWardenLogin}>
                  <input
                    type="text"
                    placeholder="Employee Number"
                    className="auth-inp uc"
                    onChange={(e) => {
                      setEmployee(e.target.value.toUpperCase());
                    }}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="auth-inp"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <input type="submit" value="Login" className="auth-btn" />
                </form>
              </div>
              <p id="fp" onClick={() => navigate("/WardenForgotPassword")}>
                Forgot Password?
              </p>
            </div>
            <div className="auth-container-2">
              <p>Still didn't registered? Register Here</p>
              <div className="auth-box">
                <form className="auth-2" onSubmit={handleWardenRegister}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="auth-inp uc"
                    onChange={(e) => {
                      setName(e.target.value.toUpperCase());
                    }}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Employee Number"
                    className="auth-inp uc"
                    onChange={(e) => {
                      setEmployee(e.target.value.toUpperCase());
                    }}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address @gmail.com"
                    className="auth-inp"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="auth-inp"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <label htmlFor="hostel">
                    Hostel No.
                    <Select
                      value={selectedOption}
                      onChange={handleHostelChange}
                      options={options}
                      isMulti
                      isSearchable
                      placeholder="Select your hostels.."
                      required
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: "none",
                          borderBottom: "solid",
                          boxShadow: state.isFocused ? null : null,
                          borderColor: state.isFocused ? "grey" : "red",
                          "&:hover": {
                            borderColor: state.isFocused
                              ? "antiquewhite"
                              : "antiquewhite",
                          },
                          backgroundColor: "transparent",
                        }),
                        dropdownIndicator: (baseStyles) => ({
                          ...baseStyles,
                          color: "antiquewhite",
                          "&:hover": {
                            color: "aliceblue",
                          },
                        }),
                        input: (baseStyles) => ({
                          ...baseStyles,
                          color: "antiquewhite",
                        }),
                        option: (baseStyles) => ({
                          ...baseStyles,
                          backgroundColor: "#4F4F4F",
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0, 0.6);",
                          },
                        }),
                        multiValue: (baseStyles) => ({
                          ...baseStyles,
                          color: "black",
                        }),
                        clearIndicator: (baseStyles) => ({
                          ...baseStyles,
                          color: "antiquewhite",
                          "&:hover": {
                            color: "red",
                          },
                        }),
                      }}
                    />
                  </label>
                  <input type="submit" value="Register" className="auth-btn" />
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Warden;
