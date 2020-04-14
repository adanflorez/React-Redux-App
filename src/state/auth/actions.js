import { LOG_IN, LOG_OUT, SIGN_UP } from "./types";
import { LOG_IN_FINISHED } from "./types";

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
