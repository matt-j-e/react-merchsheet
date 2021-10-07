import axios from "axios";

const getSalesItemsByGig = async (gigId) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/sales/${gigId}`;
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default getSalesItemsByGig;