import {
  FETCH_BLOGS_REQUEST,
  FETCH_BLOGS_SUCCESS,
  FETCH_BLOGS_FAILURE,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
} from '../Types/Blogs.js';

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        loading: false,
        blogs: action.payload,
      };
    case FETCH_BLOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_BLOG:
      return {
        ...state,
        BLOG: [...state.blogs, action.payload],
      };
    case UPDATE_BLOG:
      return {
        ...state,
        blogs: state.blogs.map(blog =>
          blog._id === action.payload._id
            ? { ...blog, ...action.payload.updatedblogData }
            : blog
        ),
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog._id !== action.payload),
      };
    default:
      return state;
  }
};

export default blogReducer;

