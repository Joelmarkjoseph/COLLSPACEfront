import React, { useState } from "react";
import "./Signup.css"; // Import the CSS file
import Navbarall from "../components/Navbarall";
import { useNavigate } from "react-router-dom";

const ProfSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idNo: "",
    name: "",
    dept: "",
    mobileno: "",
    college: "",
    email: "",
    password: "",
    otp: "", // OTP input field
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const backendURL = "https://collspaceback.onrender.com";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVerifyOtp = async () => {
    const response = await fetch(`${backendURL}/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mailid: formData.mailid,
        otp: formData.otp,
      }),
    });

    if (response.ok) {
      setOtpError("");
      alert("OTP verified! You can now complete the signup.");
    } else {
      const error = await response.json();
      setOtpError(error.error);
    }
  };

  const handleSendOtp = async () => {
    const response = await fetch(`${backendURL}/sendotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mailid: formData.mailid }),
    });

    if (response.ok) {
      setIsOtpSent(true);
      alert("OTP sent to your email.");
    } else {
      const error = await response.json();
      alert("Error sending OTP: " + error.error);
      console.log(error.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure OTP is verified before proceeding with signup
    if (!isOtpSent) {
      alert("Please verify OTP first.");
      return;
    }

    try {
      const response = await fetch(`${backendURL}/profsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Signup successful: " + result.message);
        navigate("/ProfessorLogin");
      } else {
        const error = await response.json();
        console.error("Server responded with error:", error);
        alert("Error: " + error.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error connecting to server.");
    }
  };

  return (
    <>
      <Navbarall />
      <div className="signup-container">
        <h2 className="signup-heading">Professor Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="idNo">ID Number</label>
            <input
              type="text"
              id="idNo"
              name="idNo"
              value={formData.idNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="dept">Department</label>
            <input
              type="text"
              id="dept"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="mobileno">Mobile Number</label>
            <input
              type="tel"
              id="mobileno"
              name="mobileno"
              value={formData.mobileno}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="mailid">Email ID</label>
            <input
              type="email"
              id="mailid"
              name="mailid"
              value={formData.mailid}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="button"
            onClick={handleSendOtp}
            className="signup-button"
          >
            Send OTP
          </button>

          {isOtpSent && (
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                required
              />
              {otpError && <p className="error-text">{otpError}</p>}
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="signup-button"
              >
                Verify OTP
              </button>
            </div>
          )}

          <div className="input-group">
            <label htmlFor="college">College</label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfSignup;
