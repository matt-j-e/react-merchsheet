import axios from "axios";

const postSalesItem = async (gigId, productId, values) => {
  // console.log("postSalesItem", values);
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_API_URL}/sales/${gigId}/${productId}`,
      values
    );
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.response);
    return error.response;
  }
};

export default postSalesItem;