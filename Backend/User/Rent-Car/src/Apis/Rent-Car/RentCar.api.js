import api from "../api.js";

export const rentCarApi = async (rentalId, token) => {
  try {
    const res = await api.post(
      "/user/auth/rent/rent-car",
      { rentalId },
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error in Rent Car Api Call: ", error.message);
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
