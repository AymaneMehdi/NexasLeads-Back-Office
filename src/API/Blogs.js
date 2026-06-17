import axios from 'axios';
const addBlog = async (blogData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_BLOGS_URL}`, blogData);
    return response.data;
  } catch (error) {
    console.error('Request payload:', blogData);
    console.error('Server response:', error.response?.data); 
    throw error;
  }
};
const getBlogs = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BLOGS_URL}`); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; 
  }
};
const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_BLOGS_URL}/${blogId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw error; 
  }
};
const updateBlog = async (blogId, updatedBlogData) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_BLOGS_URL}/${blogId}`, updatedBlogData); 
    return response.data; 
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error; 
  }
};
const deleteBlog = async (blogId) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_BLOGS_URL}/${blogId}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error; 
  }
};

export { addBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
