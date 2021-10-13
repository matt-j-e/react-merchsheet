import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getTours from "../requests/getTours";
import postTour from "../requests/postTour";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({name: ""});

  useEffect(() => {
    getTours().then(response => {
      setTours(response.data);
    })
  }, []);

  const handleFieldChange = (event) => {
    setNewTour({name: event.target.value});
  }

  const handleAddTour = (event) => {
    event.preventDefault();
    postTour(newTour).then(response => {
      setTours((prev) => [
        ...prev, 
            {
              id: response.data.id,
              name: response.data.name
            }
      ]);
    });
    setNewTour({name: ""});
  };

  return (
    <div className="container">
      <h2 className="heading">Tours</h2>
      <ul>
      {tours.map(tour => {
        const path = "/tour/" + tour.id;
        return (
          <li key={tour.id}>
            <Link to={path}>{tour.name}</Link>
          </li>
        )
      })}
      </ul>
      <form onSubmit={handleAddTour}>
        <h3 className="form-heading">Add a tour</h3>

        <div>
        <label htmlFor="tourName">Tour name</label>
        <input 
          type="text"
          name="tourName"
          id="tourName"
          placeholder="eg. 2021 Autumn Tour"
          value={newTour.name}
          onChange={handleFieldChange}
        />
        </div>

        <button disabled={!newTour.name} className="form-button" type="submit">Add tour</button>
      </form>
    </div>
  );

}

export default Tours;
