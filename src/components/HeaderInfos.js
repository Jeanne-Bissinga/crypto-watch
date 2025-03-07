import React, { useEffect, useState } from "react";
import axios from "axios";
import PercentChange from "./PercentChange";
import colors from "../styles/_settings.scss";
import TableFilters from "./TableFilters";

const HeaderInfos = () => {
  const [headerData, setHeaderData] = useState([]);
  useEffect(() => {
    // Requête API pour récupérer les données globales des crypto-monnaies
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((res) => setHeaderData(res.data.data));
  }, []);
  return (
    <div className="header-container">
      <ul className="title">
        <li>
          <h1>
            <img src="./assets/logo.png" alt="logo" /> Watch Tower
          </h1>
        </li>
        <li>
          {/* Affichage du nombre de crypto-monnaies actives */}
          Crypto-monnaies :{" "}
          {headerData.active_cryptocurrencies &&
            headerData.active_cryptocurrencies.toLocaleString()}
        </li>
        <li>
          {/* Affichage du nombre de marchés */}
          Marchés : {headerData.markets}
        </li>
      </ul>
      <ul className="infos-mkt">
        <li className="global-mkt">
          Global Market Cap :{" "}
          <strong
            style={{
              color:
                headerData.market_cap_change_percentage_24h_usd >= 0
                  ? colors.green1
                  : colors.red1,
            }}
          >
            <PercentChange
              percent={headerData.market_cap_change_percentage_24h_usd}
            />
          </strong>
        </li>
        <li>
          {/* Affichage de la dominance du Bitcoin en pourcentage */}
          BTC dominance :{" "}
          {headerData.market_cap_percentage &&
            headerData.market_cap_percentage.btc.toFixed(1) + "%"}
        </li>
        <li>
          {/* Affichage de la dominance de l'Ethereum en pourcentage */}
          ETH dominance :{" "}
          {headerData.market_cap_percentage &&
            headerData.market_cap_percentage.eth.toFixed(1) + "%"}
        </li>
      </ul>
      <TableFilters />
    </div>
  );
};

export default HeaderInfos;
