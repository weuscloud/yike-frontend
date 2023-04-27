import axios from 'axios';
// 注册接口
async function register({ username, password }) {
  const res = await axios.post('/register', { username, password });
  if (res.status === 200) {
    localStorage.setItem('token', res.data.token);
  }
  return res;
}


// 登录接口
async function login({ username, password }) {
  const res = await axios.post('/login', { username, password });
  if (res.status === 200) {
    localStorage.setItem('token', res.data.token);
  }
  return res;
}


export { register, login };
