import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GigSummaryCard from "./GigSummaryCard";
import getSalesItemsByGig from "../requests/getSalesItemsByGig";
import getTourIdFromGig from "../requests/getTourIdFromGig";
import salesTotalsCalculator from "../helpers/salesTotalsCalculator";
import currencyFormat from "../helpers/currencyFormat";
import getGigById from "../requests/getGigById";

const GigSummary = () => {

  const [salesItems, setSalesItems] = useState([]);
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [tourId, setTourId] = useState(0);

  const { gigId } = useParams();

  useEffect(() => {
    getSalesItemsByGig(gigId).then((response) => {
      setSalesItems(response.data);
    })
  }, [gigId]);

  useEffect(() => {
    getGigById(gigId).then((response) => {
      setVenue(response.data.venue);
      setDate(response.data.date);
    })
  }, [gigId]);

  useEffect(() => {
    getTourIdFromGig(gigId).then((response) => {
      setTourId(response.id);
    })
  }, [gigId]);

  const totals = salesTotalsCalculator(salesItems);

  return (
    <div>
      <Link to={`/tour/${tourId}`}>Tour index page</Link>
      <h2>Sales summary</h2>
      <h3>venue: {venue}</h3>
      <h3>date: {date}</h3>
      <table>
        <thead>
          <tr>
            <th>product</th>
            <th>sold</th>
            <th>gifted</th>
            <th>paypal</th>
            <th>total revenue</th>
            <th>paypal comm.</th>
            <th>net revenue</th>
            <th>chris</th>
            <th>julie</th>
            <th>fatcat</th>
          </tr>
        </thead>
        <tbody>
          {salesItems.map((item) => {
            return (
              <GigSummaryCard
                key={item.id}
                salesItem={item}
              />
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>totals</td>
            <td>{totals.numberSold}</td>
            <td>{totals.numberGifted}</td>
            <td>{totals.numberPaypal}</td>
            <td>{currencyFormat(totals.totalRevenue / 100)}</td>
            <td>{currencyFormat(totals.paypalCommission / 100)}</td>
            <td>{currencyFormat(totals.netRevenue / 100)}</td>
            <td>{currencyFormat(totals.chrisShare / 100)}</td>
            <td>{currencyFormat(totals.julieShare / 100)}</td>
            <td>{currencyFormat(totals.fatcatShare / 100)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )

}

export default GigSummary;