import axios from 'axios';
import router from '../../router.json';

// 注册接口
async function register({ username, password }) {
  try {
    const res = await axios.post('/register', { username, password });
    return {data:res.data,status:res.status};
  } catch (error) {
    return { data: {}, status: 404 }
  }
}


// 登录接口
async function login({ username, password }) {
  try {
    const res = await axios.post('/login', { username, password });
    return {data:res.data,status:res.status};
  } catch (error) {
    return { data: {}, status: 404 }
  }
}
//get user info
 async function getUserById(id) {
  try {
    const res = await axios.get(`${router.users}/${parseInt(id)}`);
    return res.data;
  } catch (error) {
    return { }
  }
}

export { register, login,getUserById };
