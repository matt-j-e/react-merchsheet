import React, { useEffect, useState } from "react";
import GigInputCard from "./GigInputCard";
import { useParams, Link } from "react-router-dom";
import getGigsByTour from "../requests/getGigsByTour";
import getProductsByTour from "../requests/getProductsByTour";
import getTourById  from "../requests/getTourById";
import getSalesItemsByTour from "../requests/getSalesItemsByTour";
import postGig from "../requests/postGig";
import postProduct from "../requests/postProduct";
import ProductSummaryCard from "./ProductSummaryCard";
import currencyFormat from "../helpers/currencyFormat";
import salesTotalsCalculator from "../helpers/salesTotalsCalculator";

const Tour = () => {

  const initialState = {
    gigFields: {
      venue: "",
      date: "",
    },
    productFields: {
      name: "",
      price: "",
      fatCatShare: "",
      chrisPercentage: "",
      juliePercentage: "",
    }
  }

  const [gigs, setGigs] = useState([]);
  const [products, setProducts] = useState([]);
  const [tourName, setTourName] = useState("");
  const [gigFields, setGigFields] = useState(initialState.gigFields)
  const [productFields, setProductFields] = useState(initialState.productFields);
  const [salesItems, setSalesItems] = useState([]);

  const { tourId } = useParams();

  useEffect(() => {
    getGigsByTour(tourId).then((response) => {
      setGigs(response.data);
    })
    getTourById(tourId).then((response) => {
      setTourName(response.data.name);
    })
    getProductsByTour(tourId).then((response) => {
      setProducts(response.data);
    })
    getSalesItemsByTour(tourId).then((response) => {
      setSalesItems(response.data);
    })
  }, [tourId]);

  const handleGigFieldChange = (event) => {
    setGigFields((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleProductFieldChange = (event) => {
    setProductFields((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleAddGig = (event) => {
    event.preventDefault();
    postGig(tourId, gigFields).then((response) => {
      setGigs((prev) => [
        ...prev,
        {
          id: response.data.id,
          venue: response.data.venue,
          date: response.data.date,
        }
      ]);
    });
    setGigFields(initialState.gigFields);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    postProduct(tourId, productFields).then((response) => {
      setProducts((prev) => [
        ...prev,
        {
          id: response.data.id,
          name: response.data.name,
          price: response.data.price,
          fatCatShare: response.data.fatCatShare,
          chrisPercentage: response.data.chrisPercentage,
          juliePercentage: response.data.juliePercentage,
        }
      ]);
    });
    setProductFields(initialState.productFields);
  };

  const totals = salesTotalsCalculator(salesItems);
  const venueCutTotal = gigs.reduce((acc, gig) => {
    return acc + gig.venueCut;
  }, 0);

  return (
    <div className="container">
      <Link to="/" className="nav-link">All tours</Link>
      <h2 className="heading">{tourName}</h2>
      <h3 className="sub-heading">Gigs on this tour</h3>

      <table>
        <thead>
          <tr>
            <th className="left">date</th>
            <th className="left">venue</th>
            <th className="right">total revenue</th>
            <th className="right">paypal comm.</th>
            <th className="right">venue cut</th>
            <th className="right">net revenue</th>
            <th className="right">chris</th>
            <th className="right">julie</th>
            <th className="right">fatcat</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {gigs.length === 0 ? (<tr><td>No Gigs added yet</td></tr>) : gigs.map((gig) => {
          return (
            <GigInputCard
              key={gig.id}
              gig={gig}
            />
          )
        })}
        </tbody>
        <tfoot>
          <tr className="totals">
            <td colSpan="2">totals</td>
            <td className="right">{currencyFormat(totals.totalRevenue / 100)}</td>
            <td className="right">{currencyFormat(totals.paypalCommission / 100)}</td>
            <td className="right">{currencyFormat(venueCutTotal / 100)}</td>
            <td className="right">{currencyFormat((totals.netRevenue - venueCutTotal) / 100)}</td>
            <td className="right">{currencyFormat((totals.chrisShare - (venueCutTotal / 2)) / 100)}</td>
            <td className="right">{currencyFormat((totals.julieShare - (venueCutTotal / 2)) / 100)}</td>
            <td className="right">{currencyFormat(totals.fatcatShare / 100)}</td>
          </tr>
        </tfoot>
      </table>

      <form onSubmit={handleAddGig}>
        <h3 className="form-heading">Add a gig</h3>
        
        <div>
        <label>Date</label>
        <input 
          type="text"
          name="date"
          id="date"
          placeholder="yyyy-mm-dd"
          value={gigFields.date}
          onChange={handleGigFieldChange}
        />
        </div>

        <div>
        <label>Venue</label>
        <input 
          type="text"
          name="venue"
          id="venue"
          placeholder="venue name"
          value={gigFields.venue}
          onChange={handleGigFieldChange}
        />
        </div>

        <button className="form-button" type="submit">Add gig</button>
      </form>

      {/* 
      -------- PRODUCTS ---------
       */}

      <h3 className="sub-heading">Products for sale on this tour</h3>
      <table>
        <thead>
        <tr>
          <th className="left">Description</th>
          <th className="right">Price (£)</th>
          <th className="right">Fatcat share (£)</th>
          <th className="center">Chris %</th>
          <th className="center">Julie %</th>
        </tr>
        </thead>
        <tbody>
        {products.length === 0
          ? (
              <tr>
                <td colSpan="5">No Products added yet</td>
              </tr>
            )
          : products.map((product) => {
          return (
            <ProductSummaryCard
              key={product.id}
              product={product}
            /> 
          )
        })}
        </tbody>
      </table>
      
      <form onSubmit={handleAddProduct}>
        <h3 className="form-heading">Add a product</h3>

        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="eg. Paranoid"
            value={productFields.name}
            onChange={handleProductFieldChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price (in pence)</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="eg. 1300"
            value={productFields.price}
            onChange={handleProductFieldChange}
          />
        </div>

        <div>
          <label htmlFor="fatCatShare">Fatcat share (in pence)</label>
          <input
            type="number"
            name="fatCatShare"
            id="fatCatShare"
            placeholder="eg. 600"
            value={productFields.fatCatShare}
            onChange={handleProductFieldChange}
          />
        </div>

        <div>
          <label htmlFor="chrisPercentage">Chris percentage</label>
          <input
            type="number"
            name="chrisPercentage"
            id="chrisPercentage"
            placeholder="eg. 50"
            value={productFields.chrisPercentage}
            onChange={handleProductFieldChange}
          />
        </div>

        <div>
          <label htmlFor="juliePercentage">Julie percentage</label>
          <input
            type="number"
            name="juliePercentage"
            id="juliePercentage"
            placeholder="eg. 50"
            value={productFields.juliePercentage}
            onChange={handleProductFieldChange}
          />
        </div>

        <div>
        <button className="form-button" type="submit">Add product</button>
        </div>

      </form>
    </div>
  )

}

export default Tour;