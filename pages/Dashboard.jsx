import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Navbarall from "../components/Navbarall";

const Dashboard = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log(token);
    if (!token) {
      // navigate("/Studentlogin");
      console.log("No Token");
    } else {
      const burld = "http://127.0.0.1:5000/dashboard";
      const burlp = "https://collspaceback.onrender.com/dashboard";
      axios
        .get(burlp, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setStudentsData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data:", error);
          if (error.response?.status === 401) {
            setError("Session expired. Please log in again.");
            localStorage.removeItem("jwtToken");
            // navigate("/Studentlogin");
          } else {
            setError("Failed to load dashboard data.");
          }
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/StudentLogin");
  };

  return (
    <>
      <Navbarall />
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {error && <div className="error-message">{error}</div>}

        {studentsData.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Year</th>
                <th>Branch</th>
                <th>Section</th>
                <th>Mobile No</th>
                <th>College</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student) => (
                <tr key={student.rollno}>
                  <td>{student.rollno}</td>
                  <td>{student.name}</td>
                  <td>{student.year}</td>
                  <td>{student.branch}</td>
                  <td>{student.section}</td>
                  <td>{student.mobileno}</td>
                  <td>{student.college}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading student data...</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
