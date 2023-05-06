import axios from "axios";

// Set the base URL
axios.defaults.baseURL = "http://localhost/api";

axios.defaults.validateStatus = function (status) {
    return true; // 返回true表示不抛出错误
};
