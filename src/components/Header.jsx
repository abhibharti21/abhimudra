import React from "react";
import "../style/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>Abhi Mud₹a</h1>
      <div className="link-con">
        <Link to={"/"}>Home</Link>
        <Link to={"/Coins"}>Coins</Link>
        <Link to={"/Exchanges"}>Exchanges</Link>
      </div>
    </div>
  );
};

export default Header;
