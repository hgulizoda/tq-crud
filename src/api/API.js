import axios from "axios";

export const API = axios.create({
  baseURL: "https://faq-crud.onrender.com/api/",
});

export const LOGIN_API = axios.create({
  baseURL: "https://dummyjson.com/",
});
