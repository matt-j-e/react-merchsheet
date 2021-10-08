import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import getSalesItemById from "../requests/getSalesItemById";
import getGigById from "../requests/getGigById";
import getProductById from "../requests/getProductById";
import postSalesItem from "../requests/postSalesItem";

const SalesItemInput = () => {

  const { gigId, productId, itemId } = useParams();
  const history = useHistory();

  const initialState = {
    salesItemFields: {
      openingStock: 0,
      numberFreebies: 0,
      numberPaypalSales: 0,
      closingStock: 0
    },

  };

  const [productName, setProductName] = useState("");
  const [salesItem, setSalesItem] = useState(initialState.salesItemFields);
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (itemId > 0) {
      getSalesItemById(itemId).then(response => {
        // console.log(response);
        setSalesItem(response.data);
      })
    }   
  }, [itemId]);

  useEffect(() => {
    getGigById(gigId).then((response) => {
      setVenue(response.data.venue);
      setDate(response.data.date);
    })
  }, [gigId]);

  useEffect(() => {
    getProductById(productId).then(response => {
      setProductName(response.data.name);
    })
  }, [productId]);

  const handleUpdateSalesItem = (event) => {
    event.preventDefault();
    postSalesItem(gigId, productId, salesItem).then(response => {
      // console.log(response.status);
      if (response.status === 200) {
        history.push(`/gig/${gigId}/input`);
      }
    })
  }

  const handleFieldChange = (event) => {
    setSalesItem((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <div>
      <Link className="nav-link" to={`/gig/${gigId}/input`}>Gig data input</Link>
      <h2 className="heading">Stock / sales input</h2>
      <h3><span className="gig-identifier">venue:</span> {venue}</h3>
      <h3><span className="gig-identifier">date:</span> {date}</h3>

      <form onSubmit={handleUpdateSalesItem}>
        <h3 className="stock-heading">{productName}</h3>

        <div>
          <label htmlFor="openingStock">Opening stock</label>
          <input
            type="number"
            size="5"
            name="openingStock"
            id="openingstock"
            value={salesItem.openingStock}
            onChange={handleFieldChange}
          />
          </div>

          <div>
          <label htmlFor="numberFreebies">Number of freebies</label>
          <input
            type="number"
            size="5"
            name="numberFreebies"
            id="numberFreebies"
            value={salesItem.numberFreebies}
            onChange={handleFieldChange}
          />
          </div>

          <div>
          <label htmlFor="numberPaypalSales">Number of paypal sales</label>
          <input
            type="number"
            size="5"
            name="numberPaypalSales"
            id="numberPaypalSales"
            value={salesItem.numberPaypalSales}
            onChange={handleFieldChange}
          />
          </div>

          <div>
          <label htmlFor="closingStock">Closing stock</label>
          <input
            type="number"
            size="5"
            name="closingStock"
            id="closingStock"
            value={salesItem.closingStock}
            onChange={handleFieldChange}
          />
          </div>

          <div>
            <button className="form-button" type="submit">Update item</button>
          </div>

      </form>
    </div>
  )
}

export default SalesItemInput;