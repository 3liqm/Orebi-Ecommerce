import {configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./CategorySlice"
import productReducer from './ProductSlice'
import cartReducer from "./CartSlice";
import searchReducer from "./SearchSlice";

const Store = configureStore({
  reducer: {
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    search: searchReducer
  }
});

export default Store
