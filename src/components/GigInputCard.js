import React from "react";
import { Link } from "react-router-dom";

const GigInputCard = ({ id, date, venue }) => {
  const summaryPath = "/gig/" + id + "/summary";
  const inputPath = "/gig/" + id + "/input"

  return (
    <li>
      <span>{date} :: </span>
      <span>{venue}  </span>
      <Link className="button-link" to={summaryPath}>financial summary</Link>
      <span>&nbsp;</span>
      <Link className="button-link" to={inputPath}>sales data input</Link>
    </li>
  )
}

export default GigInputCard;