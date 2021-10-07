import axios from "axios";

const getTourById = async (tourId) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/tours/${tourId}`;
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default getTourById;