import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsLinkedin, BsFacebook, BsGithub } from "react-icons/bs";
import "../style/Footer.css";
import "../style/Footer2.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer_left">
        <h1>ABHI MUD₹A</h1>
        <p>&copy; All copyrights reseved 2023-2025</p>
      </div>
      <div className="footer_mid">
        <h3>connect us on our social pages</h3>
        <div className="link_container">
          <a
            href="https://www.linkedin.com/in/abhishek-bharti-3322b1189/"
            rel="noreferrer"
            target={"_blank"}
          >
            <BsLinkedin />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100041314941490"
            rel="noreferrer"
            target={"_blank"}
          >
            <BsFacebook />
          </a>
          <a
            href="https://github.com/abhibharti21"
            rel="noreferrer"
            target={"_blank"}
          >
            <BsGithub />
          </a>
        </div>
      </div>
      <div className="footer_right">
        <h3>SUSCRIBE US TO GET MORE</h3>
        <div className="email_box">
          <input type="email" placeholder="Enter Your Email..." />
          <button>
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
