import axios from 'axios';
const addBlog = async (blogData) => {
  try {
    const response = await axios.post('', blogData);
    return response.data;
  } catch (error) {
    console.error('Request payload:', blogData);
    console.error('Server response:', error.response?.data); 
    throw error;
  }
};
const getBlogs = async () => {
  try {
    const response = await axios.get(''); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error; 
  }
};
const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(``); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    throw error; 
  }
};
const updateBlog = async (blogId, updatedBlogData) => {
  try {
    const response = await axios.put(``, updatedBlogData); 
    return response.data; 
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error; 
  }
};
const deleteBlog = async (blogId) => {
  try {
    const response = await axios.delete(``); 
    return response.data; 
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error; 
  }
};

export { addBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
