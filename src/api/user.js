import axios from 'axios';
import router from '../../router.json';
// 注册接口
async function register({ username, password }) {
  try {
    const res = await axios.post(`${router.register}`, { username, password });
    return {data:res.data,status:res.status};
  } catch (error) {
    return { data: {}, status: 404 }
  }
}


// 登录接口
async function login({ username, password }) {
  try {
    const res = await axios.post(`${router.login}`, { username, password });
    return {data:res.data,status:res.status};
  } catch (error) {
    return { data: {}, status: 404 }
  }
}
//get user info
async function getUser(op) {

  if (typeof op !== 'object') throw 'invalid used.';
  const id = op.id;
  if (typeof id !== 'number') throw 'invalid used.';
  try {
    let url = `${router.users}/${id}?q=`;
    Object.keys(op).forEach((key) => {
      url += `${key},`
    })
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { register, login,getUser };
