import React from "react";
import salesItemCalculator from "../helpers/salesItemCalculator";
import currencyFormat from "../helpers/currencyFormat";

const GigSummaryCard = ({ salesItem }) => {
  const item = salesItemCalculator(salesItem);


  return (
    <tr>
      <td>{item.name}</td>
      <td className="center">{item.numberSold}</td>
      <td className="center">{item.numberGifted}</td>
      <td className="center">{item.numberPaypal}</td>
      <td className="right">{currencyFormat(item.totalRevenue / 100)}</td>
      <td className="right">{currencyFormat(item.paypalCommission / 100)}</td>
      <td className="right">{currencyFormat(item.netRevenue / 100)}</td>
      <td className="right">{currencyFormat(item.chrisShare / 100)}</td>
      <td className="right">{currencyFormat(item.julieShare / 100)}</td>
      <td className="right">{currencyFormat(item.fatcatShare / 100)}</td>
      
    </tr>
  )
}

export default GigSummaryCard;