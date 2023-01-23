import React from "react";
import bg2 from "../assets/mainbg.jpg";
import "../style/Home.css";

const Home = () => {
  return (
    <div className="home">
      <main className="main-bg">
        <div className="msg_box">
          Abhi mud₹a is an innovative payment <br /> network and a new kind of
          money.
        </div>
      </main>
      <section className="second_sec">
        <img src={bg2} alt="bg_pic" />
        <div className="Heading_con">
          <h2>investment</h2>
          <h3>plan service</h3>
          <p>
            Abhi mud₹a uses peer-to-peer technology to operate with no central
            authority or banks; managing transactions and the issuing of
            bitcoins is carried out collectively by the network. Bitcoin is
            open-source; its design is public, nobody owns or controls Bitcoin
            and everyone can take part. Through many of its unique properties,
            Bitcoin allows exciting uses that could not be covered by any
            previous payment system.
          </p>
          <div className="button_con">
            <button>get started</button>
            <button>learn more</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
