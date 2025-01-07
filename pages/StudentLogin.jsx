import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentLogin.css";
import Navbarall from "../components/Navbarall";

const StudentLogin = () => {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        "https://collspaceback.onrender.com/login",
        {
          rollno,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (response.data.message) {
        alert(response.data.message);
        setIsLoading(false); // Stop loading
      } else {
        alert("Unexpected response from server.");
        setIsLoading(false); // Stop loading
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Failed to log in. Please try again.");
      setIsLoading(false); // Stop loading
    }
  };

  const handleNewuser = () => {
    navigate("/signup");
  };

  return (
    <>
      {isLoading ? (
        <div className="loading-container">
          <img
            src="/loadgif3.gif" // Path to your loading GIF
            alt="Loading"
            className="loading-gif"
          />
          <p>Loading your dashboard...</p>
        </div>
      ) : (
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
              {errorMessage && (
                <div className="error-alert">{errorMessage}</div>
              )}
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
      )}
    </>
  );
};

export default StudentLogin;
