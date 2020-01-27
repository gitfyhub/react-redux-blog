import { combineReducers } from "redux";
import postsReducer from "./postReducer";
import usersReducer from "./userReducer";

export default combineReducers({
  posts: postsReducer,
  users: usersReducer
});
