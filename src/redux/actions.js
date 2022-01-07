import Axios from "axios";
import { USER_LOGIN, USER_LOGOUT, REGISTER, AUTH_USER } from "./types";
import { USER_SERVER } from "../config";

export const login = (userData) => {
  const request = Axios.post(`${USER_SERVER}/login`, userData).then(
    (response) => response.data
  );

  return {
    type: USER_LOGIN,
    payload: request
  };
};

export const logout = () => {
  const request = Axios.get(`${USER_SERVER}/logout`).then(
    (response) => response.data
  );

  return {
    type: USER_LOGOUT,
    payload: request
  };
};

export const registerUser = (dataToSubmit) => {
  const request = Axios.post(`${USER_SERVER}/register`, dataToSubmit).then(
    (response) => response.data
  );

  return {
    type: REGISTER,
    payload: request
  };
};

export const auth = () => {
  const request = Axios.get(`${USER_SERVER}/auth`).then(
    (response) => response.data
  );

  return {
    type: AUTH_USER,
    payload: request
  };
};
