import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.20.137.159:4000/', // Adjust this to your API base URL
  timeout: 10000, // Optional: set a timeout for requests
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;
