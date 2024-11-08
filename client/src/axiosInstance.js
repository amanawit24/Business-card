// axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Set your backend base URL
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from cookies
    const token = Cookies.get('token');

    // If the token exists, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle unauthorized errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;