import React, { useEffect, useState } from "react";
import GigInputCard from "./GigInputCard";
import { useParams, Link } from "react-router-dom";
import getGigsByTour from "../requests/getGigsByTour";
import getProductsByTour from "../requests/getProductsByTour";
import getTourById  from "../requests/getTourById";
import postGig from "../requests/postGig";
import postProduct from "../requests/postProduct";
import ProductSummaryCard from "./ProductSummaryCard";

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

  return (
    <div>
      <Link to="/">All tours</Link>
      <h2>{tourName}</h2>

      <h3>Gigs on this tour</h3>
      <ul>
        {gigs.length === 0 ? (<li>No Gigs added yet</li>) : gigs.map((gig) => {
          return (
            <GigInputCard
              key={gig.id}
              id={gig.id}
              date={gig.date}
              venue={gig.venue}
            />
          )
        })}
      </ul>

      <form onSubmit={handleAddGig}>
        <h3>Add a gig</h3>
        
        <label>Date
          <input 
            type="text"
            name="date"
            id="date"
            placeholder="yyyy-mm-dd"
            value={gigFields.date}
            onChange={handleGigFieldChange}
          />
        </label>

        <label>Venue
          <input 
            type="text"
            name="venue"
            id="venue"
            placeholder="venue name"
            value={gigFields.venue}
            onChange={handleGigFieldChange}
          />
        </label>

        <button type="submit">Add tour</button>
      </form>

      {/* 
      -------- PRODUCTS ---------
       */}

      <h3>Products for sale on this tour</h3>
      <table>
        <thead>
        <tr>
          <th>Description</th>
          <th>Price (£)</th>
          <th>Fatcat share (£)</th>
          <th>Chris %</th>
          <th>Julie %</th>
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
        <h3>Add a product</h3>

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
          <label htmlFor="juliePercentage">Chris percentage</label>
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
        <button type="submit">Add product</button>
        </div>

      </form>
    </div>
  )

}

export default Tour;