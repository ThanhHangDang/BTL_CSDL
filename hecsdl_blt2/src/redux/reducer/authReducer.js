import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CHECK_LOGIN_STATUS,
  LOGOUT,
  SIGN_UP,
} from "../contant/authContant.js";

const initialState = {
  isLogin: false,
  user: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, isLogin: true, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CHECK_LOGIN_STATUS:
      return { ...state, isLogin: true, user: action.payload };
    case LOGOUT:
      return { ...state, isLogin: false, user: null }; // Reset khi đăng xuất
    case SIGN_UP:
      return state;
    default:
      return state;
  }
};

export default authReducer;
