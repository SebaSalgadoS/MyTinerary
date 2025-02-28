import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../store/reducer/authReducer";

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
  },
});

/**
 * @typedef {function} AppDispatch
 * @param {object} action - La acción de Redux a despachar.
 */

/**
 * Obtiene el estado raíz de la store.
 * @returns {RootState} El estado raíz.
 */
export function getRootState() {
  return store.getState();
}

/**
 * Obtiene la función dispatch de la store.
 * @returns {AppDispatch} La función dispatch.
 */
export function getAppDispatch() {
  return store.dispatch;
}
