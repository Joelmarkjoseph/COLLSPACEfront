import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./StudentLogin.css";
import Navbarall from "../components/Navbarall";

const StudentLogin = () => {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const backendURL = "https://collspaceback.onrender.com";

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://collspaceback.onrender.com/login",
        {
          rollno,
          password,
        }
      );

      if (response.data.token) {
        // Save the token in localStorage
        localStorage.setItem("jwtToken", response.data.token);

        // Navigate to the dashboard
        navigate("/dashboard");
      } else if (response.data.message) {
        // Show alert if there's a message
        alert(response.data.message);
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to log in. Please try again.");
    }
  };
  const handleNewuser = async () => {
    navigate("/signup");
  };

  return (
    <>
      <Navbarall />
      <div className="login-page-container">
        <div className="login-card">
          <h2>Login</h2>
          <div className="form-group">
            <label>Roll Number</label>
            <input
              type="text"
              placeholder="Enter Roll No"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="error-alert">{errorMessage}</div>}
          <button className="btn-login" onClick={handleLogin}>
            Login
          </button>{" "}
          <br /> <br />
          <button className="btn-login" onClick={handleNewuser}>
            New User? Signup
          </button>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
