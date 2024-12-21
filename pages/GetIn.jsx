import React, { useState } from "react";
import "./GetIn.css"; // Add your styles in a separate CSS file
import Navbarall from "../components/Navbarall";

const GetIn = () => {
  const [college, setCollege] = useState("");
  const [role, setRole] = useState("");

  const colleges = [
    "Select College",
    "College A",
    "College B",
    "College C",
    "College D",
  ];

  const roles = ["Select Role", "Principal", "HoD", "Professor", "Student"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (college !== "Select College" && role !== "Select Role") {
      if (role == "Student") {
        window.location.href = "/Studentlogin";
      } else if (role == "Professor") {
        window.location.href = "/Professorlogin";
      }
    } else {
      alert("Please select both college and role!");
    }
  };

  return (
    <>
      <Navbarall />
      <div className="getin-container">
        <form onSubmit={handleSubmit} className="getin-form">
          <h1 className="getin-title">Get In</h1>

          {/* College Dropdown */}
          <div className="getin-field">
            <label htmlFor="college" className="getin-label">
              Select Your College:
            </label>
            <select
              id="college"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="getin-select"
            >
              {colleges.map((collegeName, index) => (
                <option key={index} value={collegeName}>
                  {collegeName}
                </option>
              ))}
            </select>
          </div>

          {/* Role Dropdown */}
          <div className="getin-field">
            <label htmlFor="role" className="getin-label">
              What Are You?
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="getin-select"
            >
              {roles.map((roleName, index) => (
                <option key={index} value={roleName}>
                  {roleName}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="getin-button">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default GetIn;
