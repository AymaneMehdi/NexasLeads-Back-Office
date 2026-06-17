import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
} from '../Types/Blogs.js';

export const fetchBlogsRequest = () => ({
  type: FETCH_BLOGS_REQUEST,
});

export const fetchBlogsSuccess = (blogs) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: blogs,
});

export const fetchBlogsFailure = (error) => ({
  type: FETCH_BLOGS_FAILURE,
  payload: error,
});

export const addBlog = (blog) => ({
  type: ADD_BLOG,
  payload: blog,
});

export const updateBlog = (_id, updatedBlogData) => ({
  type: UPDATE_BLOG,
  payload: { _id, updatedBlogData },
});

export const deleteBlog = (_id) => ({
  type: DELETE_BLOG,
  payload: _id,
});
