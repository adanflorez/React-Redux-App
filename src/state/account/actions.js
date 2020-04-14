import {
  GET_USER_INFO,
  CHANGE_NAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  DELETE_ACCOUNT,
} from "./types";

export const getUserInfo = () => {
  return { type: GET_USER_INFO };
};

export const changeName = (newName) => {
  return { type: CHANGE_NAME, payload: newName };
};

export const changeEmail = (newEmail) => {
  return { type: CHANGE_EMAIL, payload: newEmail };
};

export const changePassword = (newPassword) => {
  return { type: CHANGE_PASSWORD, payload: newPassword };
};
export const deleteAccount = () => {
  return { type: DELETE_ACCOUNT };
};
