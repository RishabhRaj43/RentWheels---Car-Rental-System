import api from "./Api";

export const getUser = async () => {
  try {
    const userId = localStorage.getItem("profile")._id;
    const res = await api.get(`/user/${userId}`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log("Error in getUser", error);
  }
};

export const updateUser = async (data) => {
  try {
    const userId = localStorage.getItem("profile")._id;
    const res = await api.put(`/user/${userId}`, data, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log("Error in updateUser", error);
  }
};

export const deleteUser = async () => {
  try {
    const userId = localStorage.getItem("profile")._id;
    const res = await api.delete(`/user/${userId}`,{userId}, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log("Error in deleteUser", error);
  }
};
