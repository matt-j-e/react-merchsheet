import axios from "axios";

const updateGigVenueCut = async (gigId, venueCut) => {
  const path = `${process.env.REACT_APP_BACKEND_API_URL}/gigs/${gigId}/${venueCut}`;
  try {
    const response = await axios.put(path);
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
}

export default updateGigVenueCut;