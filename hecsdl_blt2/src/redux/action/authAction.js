import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_LOGIN_STATUS,
  LOGOUT,
  SIGN_UP,
} from "../contant/authContant.js";
import domain from "../../config/domain";
import { toast } from "react-toastify";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      console.log("co chay");
      const response = await axios.post(
        `http://${domain}/signin`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      dispatch(loginSuccess(response.data.user));
      localStorage.setItem("userID", response.data.user[0].UserID);
      toast.success(response?.data?.message);
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || "Sign in Fail!"));
      toast.error(err?.data?.message || "Sign in Fail!");
    }
  };
};

export const checkLoginStatus = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://${domain}/auth/`, {
        withCredentials: true,
      });
      dispatch({ type: CHECK_LOGIN_STATUS, payload: response.data });
    } catch (err) {
      dispatch({ type: LOGOUT });
    }
  };
};

export const signUp = (
  usernameRegister,
  passwordRegister,
  phoneNumberRegister,
  emailRegister,
  firstnameRegister,
  lastNameRegister,
  setStorenameRegister
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://${domain}/signup/`,
        {
          usernameRegister,
          passwordRegister,
          phoneNumberRegister,
          emailRegister,
          firstnameRegister,
          lastNameRegister,
          setStorenameRegister,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: SIGN_UP, payload: response.data });
      toast.success(response?.data?.message || "Create account success!");
    } catch (err) {
      toast.error(err?.data?.message || "Create account fail!");
    }
  };
};

export const logout = () => {};
