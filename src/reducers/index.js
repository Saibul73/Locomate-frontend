import { combineReducers } from "redux";

import authReducer from "./authReducer";
import postReducer from "./postReducer";
import usersReducer from "./usersReducer";

export const reducers = combineReducers({ authReducer, postReducer,usersReducer });
