import React from "react";
import "../../css/priceLevelIcons.css";
import { FaDollarSign } from "react-icons/fa";

type Props = {
  priceLevel: string;
};

export const PriceLevelIcons: React.FC<Props> = ({ priceLevel }) => {
  const dollarIcon = <FaDollarSign className="price-level-icon" />;

  switch (priceLevel) {
    case "PRICE_LEVEL_UNSPECIFIED":
      return <p>Not Specified</p>;
    case "PRICE_LEVEL_FREE":
      return <p>Free</p>;
    case "PRICE_LEVEL_INEXPENSIVE":
      return dollarIcon;
    case "PRICE_LEVEL_MODERATE":
      return (
        <>
          {dollarIcon}
          {dollarIcon}
        </>
      );
    case "PRICE_LEVEL_EXPENSIVE":
      return (
        <>
          {dollarIcon}
          {dollarIcon}
          {dollarIcon}
        </>
      );
    case "PRICE_LEVEL_VERY_EXPENSIVE":
      return (
        <>
          {dollarIcon}
          {dollarIcon}
          {dollarIcon}
          {dollarIcon}
        </>
      );
    default:
      return <p>Not Specified</p>;
  }
};
