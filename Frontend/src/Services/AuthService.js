import api from "./Api";

export const login = async (data) => {
  try {
    const res = await api.post("/auth/login", data, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log("Error in login", error);
  }
};

export const register = async (data) => {
  try {
    const res = await api.post("/auth/register", data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log("Error in register", error);
  }
};

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout", {}, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log("Error in logout", error);
  }
};