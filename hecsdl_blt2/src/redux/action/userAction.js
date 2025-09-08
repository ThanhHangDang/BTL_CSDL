import axios from "axios";
import {
  EDIT_USER_INFORMATION_BY_ID,
  GET_USER_INFORMATION_BY_ID,
} from "../contant/userContant.js";
import domain from "../../config/domain.js";
import { toast } from "react-toastify";
export const getUserInformationByID = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://${domain}/user-information/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response, "check response");
      dispatch({
        type: GET_USER_INFORMATION_BY_ID,
        payload: response.data.user.results[0][0],
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editUserInformationByID = (
  UserName,
  Email,
  PhoneNumber,
  LastName,
  FirstName
) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://${domain}/update_user/`,
        {
          UserName,
          Email,
          PhoneNumber,
          LastName,
          FirstName,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: EDIT_USER_INFORMATION_BY_ID,
        payload: response.data.user[0],
      });
      toast.success(response?.data?.message || "Update success!");
    } catch (err) {
      toast.error(err?.data?.message || "Update fail!");
    }
  };
};
