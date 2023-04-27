import axios from "axios";

// Set the base URL
axios.defaults.baseURL = "/api";


// Set the authorization header with the token
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Add an interceptor to Axios
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthToken(token);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);