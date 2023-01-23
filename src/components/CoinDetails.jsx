import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "../style/CoinDetails.css";
import "../style/CoinDetails2.css";
import Loader from "./Loader";
import { server } from "../index";
import Chart from "./Chart";
import ErrorComponent from "./ErrorComponent";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chaartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "Є" : "$";

  const param = useParams();

  const back = useNavigate();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  console.log(param.id);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${param.id}`);
        const { data: chartData } = await axios.get(
          `${server}/coins/${param.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [param.id, currency, days]);

  if (error) {
    return <ErrorComponent />;
  }

  return (
    <div className="CoinDetails">
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
          <div className="chart-box">
            <Chart arr={chaartArray} currency={currencySymbol} days={days} />
          </div>
          {/* buttuon */}

          <div className="time-box">
            {btns.map((elem, index) => {
              return (
                <button key={index} onClick={() => setDays(elem)}>
                  {elem}
                </button>
              );
            })}
          </div>

          <div className="details-box">
            <p className="text">
              Last updated on: {Date(coin.last_updated).split("G")[0]}
            </p>
            <img src={coin.image.large} alt="coin" />
            <h2 className="coin_name">Coin Name: {coin.name}</h2>
            <h4 className="current_price">
              current price: {currencySymbol}
              {coin.market_data.current_price[currency]}
            </h4>
            <p className="change">
              Today change: {coin.market_data.price_change_percentage_24h}%
            </p>
            <h2 className="rank">{`Rank:- #${coin.market_cap_rank}`}</h2>
            <ProgressBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              now={`${currencySymbol}${coin.market_data.current_price[currency]}`}
            />
            <Item title={"Max Supply"} value={coin.market_data.max_supply} />
            <Item
              title={"Circulating Supply"}
              value={coin.market_data.circulating_supply}
            />
            <Item
              title={"Market Capital"}
              value={`${currencySymbol} ${coin.market_data.market_cap[currency]}`}
            />
            <Item
              title={"All time low"}
              value={`${currencySymbol} ${coin.market_data.atl[currency]}`}
            />
            <Item
              title={"All time high"}
              value={`${currencySymbol} ${coin.market_data.ath[currency]}`}
            />{" "}
            <button className="backBtn" onClick={() => back(-1)}>
              go back
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Item = ({ title, value }) => {
  return (
    <div className="itembox">
      <p>{title}</p>
      <p>{value}</p>
    </div>
  );
};

const ProgressBar = ({ high, low, now }) => {
  return (
    <div className="progress">
      <input type="range" defaultValue={now} min={low} max={high} />
      <div className="pgbox">
        <h3>{low}</h3>
        <p>24 Hour range</p>
        <h3>{high}</h3>
      </div>
    </div>
  );
};

export default CoinDetails;
