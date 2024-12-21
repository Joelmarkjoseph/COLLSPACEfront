import React, { useState } from "react";
import "./ProfessorLogin.css";
import Navbarall from "../components/Navbarall";

const ProfessorLogin = () => {
  const [rollNo, setRollNo] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const sendOtp = async () => {
    if (!rollNo) {
      alert("Please enter your Roll No.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo }),
      });

      const data = await response.json();
      if (data.success) {
        setIsOtpSent(true);
        alert("OTP sent successfully!");
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rollNo, otp }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Login successful!");
        window.location.href = "/profdashboard"; // Navigate to dashboard
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbarall />
      <div className="login-container">
        <form onSubmit={verifyOtp} className="login-form">
          <h1 className="login-title">Professor Login</h1>

          {/* Roll Number Input */}
          <div className="login-field">
            <label htmlFor="rollNo" className="login-label">
              ID Number:
            </label>
            <input
              type="text"
              id="rollNo"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="Enter your Roll No"
              className="login-input"
              disabled={isOtpSent}
            />
          </div>
          {!isOtpSent && (
            <button type="button" className="otp-button" onClick={sendOtp}>
              Send OTP
            </button>
          )}

          {/* OTP Input */}
          {isOtpSent && (
            <>
              <div className="login-field">
                <label htmlFor="otp" className="login-label">
                  OTP:
                </label>
                <input
                  type="password"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="login-input"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="login-button">
                Login
              </button>
            </>
          )}
          <br />
          <button
            onClick={() => {
              window.location.href = "/signup";
            }}
            className="new-button"
          >
            New?
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfessorLogin;
