import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../Utils/Status";
import { BASE_URL } from "../Utils/apiURL";

// Initial state for the search slice
const initialState = {
  searchProducts: [],
  searchProductsStatus: STATUS.IDLE,
};

// Creating the search slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Action to clear search products
    clearSearch: (state, action) => {
      state.searchProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer case for fetching search products
      .addCase(fetchAsyncSearchProduct.pending, (state, action) => {
        state.searchProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncSearchProduct.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
        state.searchProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncSearchProduct.rejected, (state, action) => {
        state.searchProductsStatus = STATUS.FAILED;
      });
  },
});

// Async thunk to fetch search products
export const fetchAsyncSearchProduct = createAsyncThunk(
  "product-search/fetch",
  async (searchTerm) => {
    const response = await fetch(`${BASE_URL}products/search?q=${searchTerm}`);
    const data = await response.json();
    return data.products;
  }
);

// Exporting actions, selectors, and the search reducer
export const { clearSearch } = searchSlice.actions;
export const getSearchProducts = (state) => state.search.searchProducts;
export const getSearchProductsStatus = (state) =>
  state.search.searchProductsStatus;
export default searchSlice.reducer;