import axios from 'axios';
const addUser = async (userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_USERS_URL}`, userData); 
    return response.data; 
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; 
  }
};
const getUsers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_USERS_URL}`); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; 
  }
};
const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_USERS_URL}/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error; 
  }
};
const updateUser = async (userId, updatedUserData) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_USERS_URL}/${userId}`, updatedUserData); 
    return response.data; 
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; 
  }
};
const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_USERS_URL}/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error; 
  }
};

export { addUser, getUsers, getUserById, updateUser, deleteUser };
