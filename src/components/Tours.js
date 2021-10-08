import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getTours from "../requests/getTours";
import postTour from "../requests/postTour";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [newTourName, setNewTourName] = useState({name: ""});

  useEffect(() => {
    getTours().then(response => {
      setTours(response.data);
    })
  }, []);

  const handleFieldChange = (event) => {
    setNewTourName({name: event.target.value});
  }

  const handleAddTour = (event) => {
    event.preventDefault();
    postTour(newTourName).then(response => {
      setTours((prev) => [
        ...prev, 
            {
              id: response.data.id,
              name: response.data.name
            }
      ]);
    });
    setNewTourName({name: ""});
  };

  return (
    <div>
      <h2>Tours</h2>
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
        <h3>Add a tour</h3>
        <label>Tour name
          <input 
            type="text"
            name="tourName"
            id="tourName"
            placeholder="eg. 2021 Autumn Tour"
            value={newTourName.name}
            onChange={handleFieldChange}
          />
        </label>
        <button type="submit">Add tour</button>
      </form>
    </div>
  );

}

export default Tours;