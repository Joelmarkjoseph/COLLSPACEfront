import React from "react";
import "./Home.css"; // Import CSS for Home page
import Navbar from "../components/NavBar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to CollSpace</h1>
      </div>
    </>
  );
}

export default Home;
