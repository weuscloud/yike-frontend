import axios from "axios";

// 创建博客
const createBlog = (data) => {
  return axios.post("/blog", data);
};

// 获取博客列表
const getBlogs = () => {
  return axios.get("/blogs");
};

// 获取单个博客
const getBlog = (id) => {
  return axios.get(`/blog/${id}`);
};

// 更新博客
const updateBlog = (id, data) => {
  return axios.put(`/blogs/${id}`, data);
};

// 删除博客
const deleteBlog = (id) => {
  return axios.delete(`/blog/${id}`);
};

export { createBlog, getBlogs, getBlog, updateBlog, deleteBlog };
