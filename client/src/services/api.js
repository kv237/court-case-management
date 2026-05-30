import axios from "axios";

const API = axios.create({
  baseURL: "https://court-case-management-rdly.onrender.com/api",
});

export default API;