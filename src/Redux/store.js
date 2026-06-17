import { createStore, applyMiddleware, combineReducers } from 'redux'; // Import combineReducers correctly
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from "@redux-devtools/extension";
import BlogsReducer from './reducers/Blogs';
import loginReducer from "./reducers/Login";
import userReducer from "./reducers/User";

const rootReducer = combineReducers({
  Blogs: BlogsReducer,
  Login: loginReducer,
  Users: userReducer,
});

const store = createStore(rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
); 

export default store;