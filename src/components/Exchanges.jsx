import React, { useEffect } from "react";
import axios from "axios";
import "../style/Exchanges.css";
import { server } from "../index";
import { useState } from "react";
import Loader from "../components/Loader";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="Exchanges">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="data">
            {exchanges.map((elem) => {
              return (
                <ExchangesCard
                  key={elem.id}
                  img={elem.image}
                  name={elem.name}
                  rank={elem.trust_score_rank}
                  url={elem.url}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const ExchangesCard = ({ img, name, rank, url }) => {
  return (
    <div className="exchangebox" target={"_blank"}>
      <img src={img} alt="" />
      <h1 className="rank">{rank}</h1>
      <a href={url} target={"_blank"}>
        {name}
      </a>
    </div>
  );
};

export default Exchanges;
