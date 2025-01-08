import api from "../Apis/api.js";

export const rentCarController = async (req, res) => {
  try {
    const resp = await api.get(
      `/user/auth/search?key=email&value=${req.email}`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );
    console.log("User: ", resp.data);

    return res.json({
      message: "Hello from RentCarController",
      email: req.email,
      user: resp.data.user,
    });
  } catch (error) {
    console.error("Error in RentCarController: ", error.message);
    return res.status(500).json({ message: error.message });
  }
};
