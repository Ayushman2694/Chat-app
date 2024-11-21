import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"http://localhost:4500/api",
    withCredentials:true
})