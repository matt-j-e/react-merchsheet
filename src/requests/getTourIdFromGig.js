import axios from "axios";

const getTourIdFromGig = async (gigId) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/gigs/${gigId}`;
  try {
    const response = await axios.get(path);
    const { tour } = response.data;
    return tour;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default getTourIdFromGig;