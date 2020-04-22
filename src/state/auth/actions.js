import {
  LOG_IN,
  LOG_OUT,
  SIGN_UP,
  RESET_ERROR,
  LOG_IN_FINISHED,
  SEND_PASS_EMAIL,
  SEND_CONFIRMATION_EMAIL
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

export const sendPassEmail = (username) => {
  return { type: SEND_PASS_EMAIL, payload:username };
};

export const sendConfirmationEmail = (userData) => {
  return { type: SEND_CONFIRMATION_EMAIL, payload:userData };
};



