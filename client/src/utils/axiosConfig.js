import axios from "axios";

export const axiosConfig = {
  withCredentials: true,
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
 
});