import axios from 'axios';


// 获取所有tag
const getTopTags = async () => {
  const tags = localStorage.getItem('topTags');
  if (tags) {
    return JSON.parse(tags);
  }
  const response = await axios.get('/tags/top');
  return response.data;
};

// 根据id获取tag
const getTagById = async (id) => {
  const response = await axios.get(`/tags/${id}`);
  return response.data;
};




export { getTopTags, getTagById };
