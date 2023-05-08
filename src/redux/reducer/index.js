import { combineReducers } from "redux";
import user from "./userReducer";
import chatroom from "./chatroomReducer";

const rootReducer = combineReducers({
  user,
  chatroom,
});

export default rootReducer;
