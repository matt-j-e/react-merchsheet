import axios from "axios";

const getGigById = async (gigId) => {
  // const path = `http://localhost:8080/gigs/${gigId}`;
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/gigs/${gigId}`;
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default getGigById;