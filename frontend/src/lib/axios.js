import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://chat-app-mdn1.onrender.com/api",
    withCredentials:true
})