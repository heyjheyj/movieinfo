import { USER_LOGIN, USER_LOGOUT, REGISTER, AUTH_USER } from "./types";

export default function (state = {}, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, success: action.payload };
    case USER_LOGOUT:
      return { ...state };
    case REGISTER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
