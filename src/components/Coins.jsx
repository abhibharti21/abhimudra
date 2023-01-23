import React, { useEffect } from "react";
import axios from "axios";
import "../style/Coin.css";
import { server } from "../index";
import { useState } from "react";
import Loader from "../components/Loader";
import ErrorComponent from "./ErrorComponent";
import { Link } from "react-router-dom";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "Є" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  const changePage = (value) => {
    if (value >= 1 && value <= 125) {
      setPage(value);
      setLoading(true);
    }
  };

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="coins">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="curr-box"
            onChange={(e) => setCurrency(e.target.value)}
          >
            <h1>Select Currency Type:-</h1>
            <div className="curr">
              <input type="radio" value={"inr"} name="currency" />
              INR
            </div>
            <div className="curr">
              <input type="radio" value={"eur"} name="currency" />
              EUR
            </div>
            <div className="curr">
              <input type="radio" value={"usd"} name="currency" />
              USD
            </div>
          </div>

          <div className="data">
            {coins.map((elem, index) => {
              return (
                <CoinCard
                  key={index}
                  id={elem.id}
                  img={elem.image}
                  name={elem.name}
                  price={elem.current_price}
                  symbol={elem.symbol}
                  currencySymbol={currencySymbol}
                />
              );
            })}
          </div>
        </>
      )}
      <div className="page-con">
        <button onClick={() => changePage(page - 1)}>Previous</button>
        <button onClick={() => changePage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

const CoinCard = ({ id, img, name, symbol, price, currencySymbol }) => {
  return (
    <div className="coinbox" target={"_blank"}>
      <img src={img} alt={name} />
      <h1 className="name">{symbol}</h1>
      <Link to={`/Coin/${id}`}>{name}</Link>
      <h3>{price ? `${currencySymbol} ${price}` : "NAN"}</h3>
    </div>
  );
};

export default Coins;
