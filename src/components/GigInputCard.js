import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import currencyFormat from "../helpers/currencyFormat";
import salesTotalsCalculator from "../helpers/salesTotalsCalculator";
import getSalesItemsByGig from "../requests/getSalesItemsByGig";

const GigInputCard = ({ gig }) => {

  const [salesItems, setSalesItems] = useState([]);

  useEffect(() => {
    getSalesItemsByGig(gig.id).then(response => {
      setSalesItems(response.data)
    });
  }, [gig.id]);

  const summaryPath = "/gig/" + gig.id + "/summary";
  const inputPath = "/gig/" + gig.id + "/input"
  const totals = salesTotalsCalculator(salesItems);

  return (
    <tr>
      <td>{gig.date}</td>
      <td>{gig.venue}</td>
      <td className="right">{currencyFormat(totals.totalRevenue / 100)}</td>
      <td className="right">{currencyFormat(totals.paypalCommission / 100)}</td>
      <td className="right">{currencyFormat(gig.venueCut / 100)}</td>
      <td className="right">{currencyFormat((totals.netRevenue - gig.venueCut) / 100)}</td>
      <td className="right">{currencyFormat((totals.chrisShare - (gig.venueCut / 2)) / 100)}</td>
      <td className="right">{currencyFormat((totals.julieShare - (gig.venueCut / 2)) / 100)}</td>
      <td className="right">{(currencyFormat(totals.fatcatShare / 100))}</td>
      <td><Link className="button-link" to={summaryPath}>summary</Link></td>
      <td><Link className="button-link" to={inputPath}>data</Link></td>
    </tr>
  )
}

export default GigInputCard;