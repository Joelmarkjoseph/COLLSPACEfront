import React, { useState } from "react";
import "./Signup.css"; // Import the CSS file
import Navbarall from "../components/Navbarall";
const Signup = () => {
  const [formData, setFormData] = useState({
    rollno: "",
    name: "",
    year: 0,
    branch: "",
    section: "",
    mobileno: 0,
    college: "",
    mailid: "",
    otp: "", // OTP input field
  });

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const backendURL = import.meta.env.backendurl;
  const burl = "http://127.0.0.1:5000";

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
      const response = await fetch(`${backendURL}/add_student`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Signup successful: " + result.message);
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://127.0.0.1:5000/add_student", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       alert("Signup successful: " + result.message);
  //     } else {
  //       const error = await response.json();
  //       console.error("Server responded with error:", error);
  //       alert("Error: " + error.error);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //     alert("Error connecting to server.");
  //   }
  // };

  return (
    <>
      <Navbarall />
      <div className="signup-container">
        <h2 className="signup-heading">Student Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="rollno">Roll Number</label>
            <input
              type="text"
              id="rollno"
              name="rollno"
              value={formData.rollno}
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
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="branch">Branch</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="section">Section</label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
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
            <label htmlFor="mailid">Email Id:</label>
            <input
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
            <label htmlFor="college">Password:</label>
            <input
              type="password"
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

export default Signup;
