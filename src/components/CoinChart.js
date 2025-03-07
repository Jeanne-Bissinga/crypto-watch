import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import colors from "../styles/_settings.scss";

const CoinChart = ({ coinId, coinName }) => {
  // État pour stocker les données du graphique
  const [coinData, setCoinData] = useState();
  // État pour gérer la durée de la période sélectionnée
  const [duration, setDuration] = useState(30);

  // Options de durée pour l'affichage des données du graphique
  const headerData = [
    [1, "1 jour"],
    [3, "3 jours"],
    [7, "7 jours"],
    [30, "1 mois"],
    [91, "3 mois"],
    [181, "6 mois"],
    [365, "1 an"],
    [3000, "Max"],
  ];

  useEffect(() => {
    let dataArray = [];

    // Requête API pour récupérer les données du marché en fonction de la durée sélectionnée
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
          duration > 32 ? "&interval=daily" : ""
        }`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          // Formatage des données pour l'affichage dans le graphique
          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < "50" ? price : parseInt(price),
          });
        }
        setCoinData(dataArray);
      });
  }, [coinId, duration]); // Exécution de l'effet à chaque changement d'ID ou de durée

  return (
    <div className="coin-chart">
      <p>{coinName}</p>
      {/* Sélecteurs pour la durée d'affichage des données */}
      <div className="btn-container">
        {headerData.map((radio) => {
          return (
            <div
              htmlFor={"btn" + radio[0]}
              onClick={() => setDuration(radio[0])}
              key={radio[0]}
              className={radio[0] === duration ? "active-btn" : ""}
            >
              {radio[1]}
            </div>
          );
        })}
      </div>

      {/* Affichage du graphique */}
      <AreaChart
        width={680}
        height={250}
        data={coinData}
        margin={{ top: 10, right: 0, left: 100, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="7%" stopColor={colors.color1} stopOpacity={0.8} />
            <stop offset="93%" stopColor={colors.white1} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" /> {/* Axe des abscisses avec les dates */}
        <YAxis domain={["auto", "auto"]} />{" "}
        {/* Axe des ordonnées avec une échelle automatique */}
        <CartesianGrid strokeDasharray="3 3" /> {/* Grille du graphique */}
        <Tooltip /> {/* Infobulle pour afficher les valeurs au survol */}
        <Area
          type="monotone"
          dataKey="price"
          stroke={colors.color1}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default CoinChart;
