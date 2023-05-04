import axios from 'axios';
import router from '../../router.json';

// 获取所有tag
const getTopTags = async () => {
  const response = await axios.get(`${router.tags}/top`);
  if(response.status!==200)
  return [];
  return response.data;
};

// 根据id获取tag
const getTagById = async (id) => {
  const response = await axios.get(`${router.tags}/${id}`);
  return response.data;
};




export { getTopTags, getTagById };
