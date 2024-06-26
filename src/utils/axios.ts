import { refreshToken } from "@/services/auth";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API_URL;

export const ax = axios.create({
	withCredentials: true,
	baseURL: baseURL,
});
// Add a request interceptor
ax.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		const access_token = localStorage.getItem('access_token');
		config.headers.Authorization = `Bearer ${access_token}`;
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
ax.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	async function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		const originalRequest = error.config;
		if (
			+error?.response?.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			const res = (await refreshToken()).data;
			if (res.data.access_token) {
				localStorage.setItem("access_token", res.data.access_token);
				originalRequest.headers[
					"Authorization"
				] = `Bearer ${localStorage.getItem("access_token")}`;
				return ax.request(originalRequest);
			}
		}
		return Promise.reject(error?.response.data) ?? Promise.reject(error);
	}
);
