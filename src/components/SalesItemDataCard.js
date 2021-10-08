import React from "react";
import { Link } from "react-router-dom";

const SalesItemDataCard = (
  { 
    gigId,
    productId,
    name,
    id,
    openingStock,
    numberFreebies,
    numberPaypalSales,
    closingStock
  }) => {

    const linkPath = `/sales/${gigId}/${productId}/${id}`;
    const linkText = id === 0 ? "input data" : "update data";

    return (
      <tr>
        <td>{name}</td>
        <td>{openingStock}</td>
        <td>{numberFreebies}</td>
        <td>{numberPaypalSales}</td>
        <td>{closingStock}</td>
        <td>
          <Link to={linkPath}>{linkText}</Link>
        </td>
      </tr>
    )

}

export default SalesItemDataCard;