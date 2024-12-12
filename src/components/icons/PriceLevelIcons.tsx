import React from "react";
import { FaDollarSign } from "react-icons/fa";
import "../../css/priceLevelIcons.css";

type Props = {
  priceLevel: string;
};

export const PriceLevelIcons: React.FC<Props> = ({ priceLevel }) => {
  const maxIcons = 4; // 常に4つのアイコンを表示

  const renderDollarIcons = (filled: number) => {
    const icons = [];
    for (let i = 0; i < maxIcons; i++) {
      icons.push(
        <FaDollarSign
          key={i}
          className={`price-level-icon ${
            i < filled ? "price-level-icon-filled" : "price-level-icon-empty"
          }`}
        />
      );
    }
    return icons;
  };

  switch (priceLevel) {
    case "PRICE_LEVEL_FREE":
      return renderDollarIcons(0);
    case "PRICE_LEVEL_INEXPENSIVE":
      return renderDollarIcons(1);
    case "PRICE_LEVEL_MODERATE":
      return renderDollarIcons(2);
    case "PRICE_LEVEL_EXPENSIVE":
      return renderDollarIcons(3);
    case "PRICE_LEVEL_VERY_EXPENSIVE":
      return renderDollarIcons(4);
    default:
      return <p className="price-level-text">値段記載なし</p>;
  }
};
