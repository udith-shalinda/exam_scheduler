import { createStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import examReducer from "./exam/exam.reducer";
import userReducer from "./user/user.reducer";



export default combineReducers({
    user: userReducer,
    exam: examReducer
  });