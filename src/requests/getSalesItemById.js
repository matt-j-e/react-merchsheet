import axios from "axios";

const getSalesItemById = async (id) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/sales/item/${id}`;
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default getSalesItemById;