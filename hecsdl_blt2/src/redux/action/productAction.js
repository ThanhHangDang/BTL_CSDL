import axios from "axios";
import {
  GET_ALL_PRODUCT,
  GET_CATEGORY,
  GET_PRODUCT_BY_CATEGORY,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_OF_SELLER,
  DELETE_PRODUCT_OF_SELLER,
  ADD_PRODUCT_OF_SELLER,
  EDIT_PRODUCT_OF_SELLER,
  GET_PRODUCT_IN_BUYER_CART,
  ADD_PRODUCT_IN_BUYER_CART,
  DELETE_PRODUCT_IN_BUYER_CART,
} from "../contant/productContant.js";
import domain from "../../config/domain.js";
import { toast } from "react-toastify";

export const getAllProduct = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://${domain}/get-all-product`, {
        withCredentials: true,
      });
      dispatch({ type: GET_ALL_PRODUCT, payload: response.data.products[0] });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://${domain}/categories/`, {
        withCredentials: true,
      });
      dispatch({ type: GET_CATEGORY, payload: response.data.categories[0] });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductByCategory = (index) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://${domain}/products/category/${index}`,
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: GET_PRODUCT_BY_CATEGORY,
        payload: response.data.products[0],
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductByID = (id) => {
  return async (dispatch) => {
    try {
      console.log("check point");
      const response = await axios.get(`http://${domain}/product/${id}/`, {
        withCredentials: true,
      });

      dispatch({ type: GET_PRODUCT_BY_ID, payload: response.data.product[0] });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getProductOfSeller = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://${domain}/products/user/${id}`, {
        withCredentials: true,
      });
      dispatch({
        type: GET_PRODUCT_OF_SELLER,
        payload: response.data.products[0],
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteProductOfSeller = (sellerID, productID) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://${domain}/delete_product`,
        {
          params: {
            sellerID,
            productID,
          },
        },
        {
          withCredentials: true,
        }
      );
      dispatch({ type: DELETE_PRODUCT_OF_SELLER, payload: response.data });
      toast.success("Delete success!");
    } catch (err) {
      console.log(err);
      toast.error("Delete fail!");
    }
  };
};

export const addProductOfSeller = (
  sellerID,
  productID,
  productName,
  image,
  price,
  quantity,
  description
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://${domain}/add-product-of-seller`,
        {
          sellerID,
          productID,
          productName,
          image,
          price,
          quantity,
          description,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: ADD_PRODUCT_OF_SELLER,
        payload: response.data.product[0],
      });
      toast.success("Add success!");
    } catch (err) {
      console.log(err);
      toast.error("Add fail!");
    }
  };
};

export const editProductOfSeller = (
  productID,
  productName,
  image,
  price,
  quantity,
  description
) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://${domain}/update-product`,
        { productID, productName, image, price, quantity, description },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: EDIT_PRODUCT_OF_SELLER,
        payload: response.data.product[0],
      });
      toast.success("Edit success!");
    } catch (err) {
      console.log(err);
      toast.error("Edit fail!");
    }
  };
};

export const getProductInBuyerCart = (buyerID) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://${domain}/get-product-in-buyer-cart`,
        { buyerID },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: GET_PRODUCT_IN_BUYER_CART,
        payload: response.data.product[0],
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addProductInBuyerCart = (buyerID, productID) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://${domain}/add-product-in-buyer-cart`,
        { buyerID, productID },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: ADD_PRODUCT_IN_BUYER_CART,
        payload: response.data.product[0],
      });
      toast.success("Add cart success!");
    } catch (err) {
      console.log(err);
      toast.error("Add cart fail!");
    }
  };
};

export const deleteProductInBuyerCart = (buyerID, productID) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://${domain}/delete-product-in-buyer-cart`,
        { buyerID, productID },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: DELETE_PRODUCT_IN_BUYER_CART,
        payload: response.data.product[0],
      });
      toast.success("Delete product from cart success!");
    } catch (err) {
      console.log(err);
      toast.error("Delete product from cart fail!");
    }
  };
};
