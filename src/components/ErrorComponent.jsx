import React from "react";
import "../style/Sorry.css";
import sorry from "../assets/sorry.png";
import { Link, useNavigate } from "react-router-dom";

const ErrorComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="Error">
      <img src={sorry} alt="sorru" />
      <h5>Sorry ! Unable to get data.</h5>
      <button onClick={() => navigate(-1)}>go back</button>
    </div>
  );
};

export default ErrorComponent;
