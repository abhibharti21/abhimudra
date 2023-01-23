import React from "react";
import "../style/Loader.css";
import loading from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loading} alt="Loading" />
      <p>Loading....</p>
    </div>
  );
};

export default Loader;
