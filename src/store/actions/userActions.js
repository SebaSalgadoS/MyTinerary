import { createAction } from "@reduxjs/toolkit";

export const loginAction = createAction("login", (data) => {
  return {
    payload: data,
  };
});

export const logoutAction = createAction("logout");