import axios from 'axios';
const api = axios.create();
//1d
const expiredTime=60 * 60 * 1000*24;
//请求拦截器
api.interceptors.request.use(
  config => {
    if(config.method!=='get')return config;
    const cachedData = JSON.parse(localStorage.getItem(config.url));
    if (cachedData && cachedData.expires > new Date().getTime()) {
      config.headers['If-None-Match'] = cachedData.etag;
      config.headers['If-Modified-Since'] = cachedData.lastModified;
      return Promise.resolve({...config,data:cachedData});
    }else{
      localStorage.removeItem(config.url)
    }
   return config;
   
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300&& response.config.method === 'get') {
      const { data } = response;
      // 检查响应是否包含缓存控制头
      const cacheControl = response.headers['cache-control'];
      if (cacheControl && cacheControl.includes('max-age')) {
        const maxAge = parseInt(cacheControl.match(/max-age=(\d+)/)[1], 10);
        const expires = new Date().getTime() + maxAge * 1000;
        localStorage.setItem(response.config.url, JSON.stringify({ data, expires }));
      } else {
        const expires = new Date().getTime() + expiredTime;
        localStorage.setItem(response.config.url, JSON.stringify({ data, expires }));
      }
    }

    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export async function createArticle(title, description, content,tags, authorId) {
  try {
    const response = await api.post('/blogs', {
      title,
      description,
      content,
      authorId,
      tags
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getArticle(id) {
  try {
    const response = await api.get(`/blogs/${id}`);
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
async function updateArticle(id, title, description, content) {
  try {
    const response = await api.put(`/blogs/${id}`, {
      title,
      description,
      content,
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
