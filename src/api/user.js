import axios from 'axios';
// 注册接口
function register(userData) {
  return axios.post('/regist', userData);
}

// 登录接口
function login(userData) {
  return axios.post('/login', userData);
}

export { register, login };
