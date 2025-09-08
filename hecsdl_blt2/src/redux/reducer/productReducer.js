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

const initialState = {
  category: null,
  listProducts: null,
  product: null,
  productOfSeller: null,
  productInBuyerCart: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return { ...state, listProducts: action.payload };
    case GET_CATEGORY:
      return { ...state, category: action.payload };
    case GET_PRODUCT_BY_CATEGORY:
      return { ...state, listProducts: action.payload };
    case GET_PRODUCT_BY_ID:
      return { ...state, product: action.payload };
    case GET_PRODUCT_OF_SELLER:
      return { ...state, productOfSeller: action.payload };
    case DELETE_PRODUCT_OF_SELLER:
      return state;
    case ADD_PRODUCT_OF_SELLER:
      return { ...state, productOfSeller: action.payload };
    case EDIT_PRODUCT_OF_SELLER:
      return { ...state, productOfSeller: action.payload };
    case GET_PRODUCT_IN_BUYER_CART:
      return { ...state, productInBuyerCart: action.payload };
    case ADD_PRODUCT_IN_BUYER_CART:
      return { ...state, productInBuyerCart: action.payload };
    case DELETE_PRODUCT_IN_BUYER_CART:
      return state;
    default:
      return state;
  }
};

export default productReducer;
