import axios from "axios";

export const firuApi = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    // baseURL: "http://localhost:5000/api"
    baseURL: "https://firulaix-api-nodejs.vercel.app/api"
});
