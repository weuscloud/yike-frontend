import axios from 'axios';
// 注册接口
async function register({ username, password }) {
  try {
    const res = await axios.post('/register', { username, password });
    return res;
  } catch (error) {
    return { data: {}, status: 404 }
  }
}


// 登录接口
async function login({ username, password }) {
  try {
    const res = await axios.post('/login', { username, password });
    return res;
  } catch (error) {
    return { data: {}, status: 404 }
  }
}
//get user info
async function getUserById(id) {

}
async function logOut(){
  
}
export { register, login, getUserById };
