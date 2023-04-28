import axios from "axios";

// Set the base URL
axios.defaults.baseURL = "http://localhost/api";

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

axios.defaults.validateStatus = function (status) {
    return true; // 返回true表示不抛出错误
};
