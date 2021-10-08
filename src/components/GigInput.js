import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import ProductInputCard from "./ProductInputCard";
import SalesItemDataCard from "./SalesItemDataCard";
import getTourIdFromGig from "../requests/getTourIdFromGig";
import getProductsByTour from "../requests/getProductsByTour";
import getGigById from "../requests/getGigById";
import getSalesItemsByGig from "../requests/getSalesItemsByGig";

const GigInput = () => {
  const [products, setProducts] = useState([]);
  const [tourId, setTourId] = useState(0);
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [salesItems, setSalesItems] = useState([]);

  const { gigId } = useParams();

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

  useEffect(() => {
    getSalesItemsByGig(gigId).then((response) => {
      setSalesItems(response.data);
    })
  }, [gigId]);

  useEffect(() => {
    getProductsByTour(tourId).then((response) => {
      setProducts(response.data);
    })
  }, [tourId]);


  return (
    <div>
      <Link to={`/tour/${tourId}`}>Tour index page</Link>
      <h2>Stock / sales input</h2>
      <h3>venue: {venue}</h3>
      <h3>date: {date}</h3>
      <table>
      <thead>
        <tr>
          <th>product</th>
          <th>opening stock</th>
          <th>freebies</th>
          <th>paypal sales</th>
          <th>closing stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {products.map((product) => {
        let id = 0;
        let openingStock = 0;
        let numberFreebies = 0;
        let numberPaypalSales = 0;
        let closingStock = 0;
        salesItems.forEach((item) => {
          if (item.product.id === product.id) {
            id = item.id;
            openingStock = item.openingStock;
            numberFreebies = item.numberFreebies;
            numberPaypalSales = item.numberPaypalSales;
            closingStock = item.closingStock;
          }
        });
        return (
          // <ProductInputCard
          <SalesItemDataCard
            key={product.id}
            gigId={gigId}
            productId={product.id}
            name={product.name}
            id={id}
            openingStock={openingStock}
            numberFreebies={numberFreebies}
            numberPaypalSales={numberPaypalSales}
            closingStock={closingStock}
          />
        )
      })}
      </tbody>
      </table>
    </div>
  )

}

export default GigInput;