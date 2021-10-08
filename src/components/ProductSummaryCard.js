import React from "react";
import currencyFormat from "../helpers/currencyFormat";

const ProductSummaryCard = ({ product }) => {
  const { name, price, fatCatShare, chrisPercentage, juliePercentage } = product;
  
  return (
    <tr>
      <td>{name}</td>
      <td className="right">{currencyFormat(price / 100)}</td>
      <td className="right">{currencyFormat(fatCatShare / 100)}</td>
      <td className="center">{chrisPercentage}%</td>
      <td className="center">{juliePercentage}%</td>
    </tr>
  )
}

export default ProductSummaryCard;