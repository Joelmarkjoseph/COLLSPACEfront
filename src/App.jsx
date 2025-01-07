import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HelloPage from "../pages/HelloPage";
import "./App.css";
import Home from "../pages/Home";
import GetIn from "../pages/GetIn";
import StudentLogin from "../pages/StudentLogin";
import Signup from "../pages/Signup";
import ProfessorLogin from "../pages/ProfessorLogin";
import Dashboard from "../pages/Dashboard";
import ProfSignup from "../pages/ProfSignup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/getin" element={<GetIn />} />
        <Route path="/Studentlogin" element={<StudentLogin />} />
        <Route path="/ProfessorLogin" element={<ProfessorLogin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profsignup" element={<ProfSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
