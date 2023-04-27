import axios from 'axios';
// 注册接口
function register({ username, password }) {
  return axios.post('/register',{ username, password } );
}

// 登录接口
function login({ username, password }) {
  return axios.post('/login', { username, password });
}

export { register, login };
