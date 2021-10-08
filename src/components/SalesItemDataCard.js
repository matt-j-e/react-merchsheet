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
        <td className="center">{openingStock}</td>
        <td className="center">{numberFreebies}</td>
        <td className="center">{numberPaypalSales}</td>
        <td className="center">{closingStock}</td>
        <td>
          <Link className="button-link" to={linkPath}>{linkText}</Link>
        </td>
      </tr>
    )

}

export default SalesItemDataCard;