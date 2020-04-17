import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  RESET_ERROR,
  LOG_IN_FINISHED,
} from "./types";

export const logIn = (userData) => {
  return { type: LOG_IN, payload: userData };
};

export const logOut = () => {
  return { type: LOG_OUT };
};

export const signUp = (userData) => {
  return { type: SIGN_UP, payload: userData };
};

export const logInFinished = (user) => {
  return { type: LOG_IN_FINISHED, payload: user };
};

export const resetError = () => {
  return { type: RESET_ERROR };
};
