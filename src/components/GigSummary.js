import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import GigSummaryCard from "./GigSummaryCard";
import getSalesItemsByGig from "../requests/getSalesItemsByGig";
import getTourIdFromGig from "../requests/getTourIdFromGig";
import salesTotalsCalculator from "../helpers/salesTotalsCalculator";
import currencyFormat from "../helpers/currencyFormat";
import getGigById from "../requests/getGigById";
import updateGigVenueCut from "../requests/updateGigVenueCut";

const GigSummary = () => {

  const [salesItems, setSalesItems] = useState([]);
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [venueCut, setVenueCut] = useState("");
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
      setVenueCut(response.data.venueCut);
    })
  }, [gigId]);

  useEffect(() => {
    getTourIdFromGig(gigId).then((response) => {
      setTourId(response.id);
    })
  }, [gigId]);

  const totals = salesTotalsCalculator(salesItems);

  const unhideVenueCutUpdateForm = () => {
    const updateForm = document.getElementById("updateVenueCut");
    updateForm.classList.remove("hidden");
    updateForm.classList.add("visible");
  }

  const handleVenueCutFieldChange = (event) => {
    setVenueCut(event.target.value);
  }

  const handleVenueCutUpdate = (event) => {
    event.preventDefault();
    updateGigVenueCut(gigId, venueCut).then(response => {
      console.log(response);
      if (response.status === 200) {
        const updateForm = document.getElementById("updateVenueCut");
        updateForm.classList.add("hidden");
        updateForm.classList.remove("visible");
      }
    });
  };

  return (
    <div className="container">
      <Link className="nav-link" to={`/tour/${tourId}`}>Tour index page</Link>
      <h2 className="heading">Sales summary</h2>
      <h3><span className="gig-identifier">venue:</span> {venue}</h3>
      <h3><span className="gig-identifier">date:</span> {date}</h3>
      <table>
        <thead>
          <tr>
            <th className="left">product</th>
            <th className="center">sold</th>
            <th className="center">gifted</th>
            <th className="center">paypal</th>
            <th className="right">total revenue</th>
            <th className="right">paypal comm.</th>
            <th className="right">net revenue</th>
            <th className="right">chris</th>
            <th className="right">julie</th>
            <th className="right">fatcat</th>
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
          <tr className="totals">
            <td>totals</td>
            <td className="center">{totals.numberSold}</td>
            <td className="center">{totals.numberGifted}</td>
            <td className="center">{totals.numberPaypal}</td>
            <td className="right">{currencyFormat(totals.totalRevenue / 100)}</td>
            <td className="right">{currencyFormat(totals.paypalCommission / 100)}</td>
            <td className="right">{currencyFormat(totals.netRevenue / 100)}</td>
            <td className="right">{currencyFormat(totals.chrisShare / 100)}</td>
            <td className="right">{currencyFormat(totals.julieShare / 100)}</td>
            <td className="right">{currencyFormat(totals.fatcatShare / 100)}</td>
          </tr>
          <tr className="totals">
            <td>less: venue cut</td>
            <td colSpan="5"><button className="button-link" onClick={unhideVenueCutUpdateForm}>Update</button></td>
            <td className="right">{currencyFormat(venueCut / 100)}</td>
            <td className="right">{currencyFormat(venueCut / 200)}</td>
            <td className="right">{currencyFormat(venueCut / 200)}</td>
            <td></td>
          </tr>
          <tr className="totals">
            <td colSpan="6">Total split</td>
            <td className="right">{currencyFormat((totals.netRevenue - venueCut) / 100)}</td>
            <td className="right">{currencyFormat((totals.chrisShare - (venueCut / 2)) / 100)}</td>
            <td className="right">{currencyFormat((totals.julieShare - (venueCut / 2)) / 100)}</td>
            <td className="right">{currencyFormat(totals.fatcatShare / 100)}</td>
          </tr>
        </tfoot>
      </table>

      <form id="updateVenueCut" className="hidden" onSubmit={handleVenueCutUpdate}>
          <h3 className="form-heading">Update venue cut</h3>

          <div>
            <label>New amount (in pence)</label>
            <input
              type="number"
              name="venueCut"
              id="venueCut"
              placeholder="eg. enter £50 as 5000"
              value={venueCut}
              onChange={handleVenueCutFieldChange}
            />
          </div>

          <div>
          <button className="form-button" type="submit">Update amount</button>
          </div>
      </form>

    </div>
  )

}

export default GigSummary;