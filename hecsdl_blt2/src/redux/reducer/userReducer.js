import {
  GET_USER_INFORMATION_BY_ID,
  EDIT_USER_INFORMATION_BY_ID,
} from "../contant/userContant.js";

const initialState = {
  userInformation: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFORMATION_BY_ID:
      return { ...state, userInformation: action.payload };
    case EDIT_USER_INFORMATION_BY_ID:
      return { ...state, userInformation: action.payload };
    default:
      return state;
  }
};

export default userReducer;
