import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./reducer/authReducer.js";
import productReducer from "./reducer/productReducer.js";
import userReducer from "./reducer/userReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
