import { createReducer } from "@reduxjs/toolkit";
import {loginAction, logoutAction} from "../actions/userActions"

const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    country: "",
  };

export const authReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(loginAction, (state, action) =>{
      return {...state, ...action.payload};
    })
    .addCase(logoutAction, (state, action) =>initialState)
}) 
    
