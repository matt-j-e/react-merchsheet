import axios from "axios";

const getTours = async () => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/tours`;

  try {
    const response = await axios.get(path);
    // console.log(response);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  } 
};

export default getTours;