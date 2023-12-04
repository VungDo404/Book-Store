import { refreshToken } from "@/services/auth";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL; 

export const ax = axios.create({
  withCredentials: true,
  baseURL: baseURL, 
  headers: {'Authorization': `Bearer ${localStorage.getItem("access_token")}`}
});
// Add a request interceptor
ax.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
ax.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    if( originalRequest.url === 'auth/account' && +error?.response?.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;
      const res = (await refreshToken()).data;
      if(res.data.access_token){
        localStorage.setItem("access_token", res.data.access_token);
        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;
        return ax.request(originalRequest);
      }
    }
    if( originalRequest.url === 'auth/refresh' && +error?.response?.status === 400){
      window.location.href = "/login";
    }
    return Promise.reject(error?.response.data) ?? Promise.reject(error);
  });