import axios from "axios";

const getProductsByTour = async (tourId) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/products/${tourId}`;
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default getProductsByTour;