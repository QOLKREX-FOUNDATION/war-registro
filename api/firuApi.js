import axios from "axios";

export const firuApi = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://firulaix-api-nodejs.vercel.app/api/",
  // baseURL: "https://firulaix-api-prueba.onrender.com/api",
  // baseURL: "https://firulaix-api-nodejs.vercel.app/api",
  // baseURL: "https://13aa-190-237-31-158.ngrok-free.app/api",
  // baseURL: "https://3tfgz37n-5000.brs.devtunnels.ms/api",
  // baseURL: "https://firulaix-api-test.vercel.app/api",
});
