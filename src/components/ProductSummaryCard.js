import React from "react";
import currencyFormat from "../helpers/currencyFormat";

const ProductSummaryCard = ({ product }) => {
  const { name, price, fatCatShare, chrisPercentage, juliePercentage } = product;
  
  return (
    <tr>
      <td>{name}</td>
      <td>{currencyFormat(price / 100)}</td>
      <td>{currencyFormat(fatCatShare / 100)}</td>
      <td>{chrisPercentage}%</td>
      <td>{juliePercentage}%</td>
    </tr>
  )
}

export default ProductSummaryCard;