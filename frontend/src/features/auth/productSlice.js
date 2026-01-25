import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosInstance";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/product");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.list = [];
        state.error = action.payload;
      });
  },
});


export const selectProductById = (state, productId) =>
  state?.products?.list?.find((p) => p._id === productId || p.id === productId);

export const selectMenProducts = (state) =>
  (state?.products?.list || []).filter((p) => p.category === "men");

export const selectWomenProducts = (state) =>
  (state?.products?.list || []).filter((p) => p.category === "women");

export const selectKidsProducts = (state) =>
  (state?.products?.list || []).filter((p) => p.category === "kids");

export const selectHomeProducts = (state) =>
  (state?.products?.list || []).filter((p) => p.category === "home");

export default productsSlice.reducer;
