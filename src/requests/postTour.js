import axios from "axios";

const postTour = async (values) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/tours`;
  try {
    const response = await axios.post(path, values);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export default postTour;