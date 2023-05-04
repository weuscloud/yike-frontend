import axios from 'axios';
import router from '../../router.json';
const api = axios.create();

api.interceptors.request.use(
  (config) => {
    // 从浏览器的本地存储中获取 JWT Token
    const token = localStorage.getItem('token');

    // 如果 JWT Token 存在，则在请求头中添加 Authorization 字段
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // 处理请求错误
    console.error(error);
    return Promise.reject(error);
  }
);


export async function createArticle({ title, description, content, tags }) {
  try {
    const response = await api.post(`${router.blogs}`, {
      title,
      description,
      content,
      tags
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticle(op) {

  if (typeof op !== 'object') throw 'invalid used.';
  const {id } = op;
  try {
    let url = `${router.blogs}/${id}?q=`;
    Object.keys(op).forEach((key) => {
      url += `${key},`
    })
    const response = await api.get(`${url}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getPOPArticles() {
  try {
    const response = await api.get(`${router.blogs}/pop`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function updateArticle({ id, title, description, content, tags }) {
  try {
    const response = await api.put(`${router.blogs}/${id}`, {
      title,
      description,
      content,
      tags
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteArticle(id) {
  try {
    const response = await api.delete(`${router.blogs}/${id}`);
    return response.status;
  } catch (error) {
    console.error(error);
  }
}
export async function getArticles() {
  try {
    const res = await api.get(`${router.blogs}`);
    return res.data;
  } catch (error) {
    return {}
  }
}
export async function getTagArticles(op){
  if (typeof op !== 'object') throw 'invalid used.';
  const {id } = op;
  try {
    let url = `${router.blogs}/tags/${id}?q=`;
    Object.keys(op).forEach((key) => {
      url += `${key},`
    })
    const response = await api.get(`${url}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}