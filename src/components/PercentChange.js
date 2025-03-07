import React, { useEffect, useState } from "react";
import colors from "../styles/_settings.scss";

const PercentChange = ({ percent }) => {
  const [color, setColor] = useState();
  useEffect(() => {
    if (percent) {
      if (percent >= 0) {
        setColor(colors.green1);
      } else {
        setColor(colors.red1);
      }
    } else {
      setColor(colors.white1);
    }
  }, []);

  return (
    <p className="percent-change-container" style={{ color }}>
      {/* Affichage du pourcentage avec une seule décimale, ou un tiret si aucune valeur */}
      {percent ? percent.toFixed(1) + "%" : "-"}
    </p>
  );
};

export default PercentChange;
