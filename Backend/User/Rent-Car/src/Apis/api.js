import axios from "axios";
import env from "../Env/env.js";

const api = axios.create({
  baseURL: env.BASE_URL,
  withCredentials: true,
});

export default api;
