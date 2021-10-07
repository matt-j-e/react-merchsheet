import React from "react";
import salesItemCalculator from "../helpers/salesItemCalculator";
import currencyFormat from "../helpers/currencyFormat";

const GigSummaryCard = ({ salesItem }) => {
  const item = salesItemCalculator(salesItem);


  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.numberSold}</td>
      <td>{item.numberGifted}</td>
      <td>{item.numberPaypal}</td>
      <td>{currencyFormat(item.totalRevenue / 100)}</td>
      <td>{currencyFormat(item.paypalCommission / 100)}</td>
      <td>{currencyFormat(item.netRevenue / 100)}</td>
      <td>{currencyFormat(item.chrisShare / 100)}</td>
      <td>{currencyFormat(item.julieShare / 100)}</td>
      <td>{currencyFormat(item.fatcatShare / 100)}</td>
      
    </tr>
  )
}

export default GigSummaryCard;