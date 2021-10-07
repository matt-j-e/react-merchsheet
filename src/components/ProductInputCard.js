import React, { useState } from "react";
import postSalesItem from "../requests/postSalesItem";

const ProductInputCard = ({ gigId, productId, name, id, openingStock, numberFreebies, numberPaypalSales, closingStock }) => {
  const initialState = {
    fields: {
      id: id,
      openingStock: openingStock,
      numberFreebies: numberFreebies,
      numberPaypalSales: numberPaypalSales,
      closingStock: closingStock
    },
    alert: {
      message: "",
      isSuccess: false
    }
  }

  const [fields, setFields] = useState(initialState.fields);
  // const [alert, setAlert] = useState(initialState.alert)

  const handleFieldChange = (event) => {
    console.log(event.target);
    setFields((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleAddSalesItem = (event) => {
    console.log(gigId, productId, fields);
    postSalesItem(gigId, productId, fields).then((data) => {
      console.log(data);
      setFields((prev) => {
        return {
          ...prev,
          id: data.id
        };
      });
    });
    // setAlert({ message: "", isSuccess: false });
    // postSalesItem(gigId, id, fields).then((status) => {
    //   status === 201
    //     ? setAlert({
    //         message: "Your property was added to the database.",
    //         isSuccess: true,
    //       })
    //     : setAlert({
    //         message: "A server error occurred. Please try again.",
    //       });
    // });
  }

  return (
    <div>
      <h3>{name}</h3>
        <span>
          <label>opening stock
            <input 
              type="number"
              id={("ostock-") + productId}
              name="openingStock"
              size="4"
              value={fields.openingStock}
              onChange={handleFieldChange}
            />
          </label>
        </span>

        <span>
          <label>freebies
            <input 
              type="number"
              id={("freebies-") + productId}
              name="numberFreebies"
              size="4"
              value={fields.numberFreebies}
              onChange={handleFieldChange}
            />
          </label>
        </span>

        <span>
          <label>paypal sales
            <input 
              type="number"
              id={("paypals-") + productId}
              name="numberPaypalSales"
              size="4"
              value={fields.numberPaypalSales}
              onChange={handleFieldChange}
            />
          </label>
        </span>

        <span>
          <label>closing stock
            <input 
              type="number"
              id={("cstock-") + productId}
              name="closingStock"
              size="4"
              value={fields.closingStock}
              onChange={handleFieldChange}
            />
          </label>
        </span>

        <span>
          <button
            type="button"
            id={("save-product-") + productId}
            onClick={handleAddSalesItem}
          >
            save
          </button>
        </span>
    </div>
  )
}

export default ProductInputCard;