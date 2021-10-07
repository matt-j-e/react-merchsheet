import axios from "axios";

const postProduct = async (tourId, values) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/products/${tourId}`;
  try {
    const response = await axios.post(path, values);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export default postProduct;