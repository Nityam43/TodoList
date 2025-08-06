import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.PROD 
    ? "/api/" // Use relative path for production (Vercel routing)
    : "http://localhost:3000/",
  withCredentials: true,
});

export default instance;
