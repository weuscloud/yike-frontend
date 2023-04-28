import axios from 'axios';
// 注册接口
async function register({ username, password }) {
  const res = await axios.post('/register', { username, password });
  if (res.status === 200) {
    const { token } = res.data;
    if (token)
      localStorage.setItem('token', token);
  }
  return res;
}


// 登录接口
async function login({ username, password }) {
  const res = await axios.post('/login', { username, password });
  if (res.status === 200) {
    const { token } = res.data;
    if (token)
      localStorage.setItem('token', token);
  }
  return res;
}
//get user info
async function getUserById(id){
  const res = await axios.get(`/users/${id}`);
  if (res.status === 200) {
    const { user } = res.data;
    if (user)
      return user;
  }
  return {};
}

export { register, login ,getUserById};
