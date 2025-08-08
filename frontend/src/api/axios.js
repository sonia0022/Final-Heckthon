// src/api/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.FrontEnd}`,
    withCredentials: true,
});


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
