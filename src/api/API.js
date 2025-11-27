import axios from "axios";

const API = axios.create({
  baseURL: "https://faq-crud.onrender.com/api/",
});

export default API;
