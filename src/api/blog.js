import axios from 'axios';

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
    const response = await api.post('/blogs', {
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
  const id = parseInt(op.id);
  if (typeof id !== 'number') throw 'invalid used.';
  try {
    let url = `/blogs/${id}?q=`;
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
    const response = await api.get('/blogs/pop');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function updateArticle({ id, title, description, content, tags }) {
  id = parseInt(id)
  try {
    const response = await api.put(`/blogs/${id}`, {
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
async function deleteArticle(id) {
  try {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getArticles() {
  try {
    const res = await api.get(`/blogs`);
    return res.data;
  } catch (error) {
    return {}
  }
}