import axios from "axios";

const getGigsByTour = async (tourId) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/gigs/tour/${tourId}`;
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default getGigsByTour;