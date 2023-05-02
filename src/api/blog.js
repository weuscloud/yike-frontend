const axios = require('axios');

async function createArticle(title, description, content,tags, authorId) {
  try {
    const response = await axios.post('/blogs', {
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
async function getArticle(id) {
  try {
    const response = await axios.get(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
async function getAllArticles() {
  try {
    const response = await axios.get('/blogs');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
async function updateArticle(id, title, description, content) {
  try {
    const response = await axios.put(`/blog/${id}`, {
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
    const response = await axios.delete(`/blog/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
