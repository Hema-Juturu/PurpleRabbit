import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axiosInstance";

export const fetchCart = createAsyncThunk("products/fetchCart", async () => {
  const res = await api.get("/cart");
  return Array.isArray(res.data) ? res.data : [];
});

export const addToCart = createAsyncThunk(
  "products/addToCart",
  async ({ id, quantity = 1 }) => {
    const res = await api.post("/cart/add", {
      productId: id,
      quantity,
    });
    return Array.isArray(res.data) ? res.data : null;
  },
);

export const removeFromCart = createAsyncThunk(
  "products/removeFromCart",
  async (productId) => {
    const res = await api.delete(`/cart/${productId}`);
    return res.data;
  },
);

export const updateQuantity = createAsyncThunk(
  "products/updateQuantity",
  async ({ productId, quantity }, { dispatch }) => {
    if (quantity <= 0) {
      const res = await dispatch(removeFromCart(productId)).unwrap();
      return res;
    }
    const res = await api.put("/cart/update", { productId, quantity });
    return res.data;
  },
);

export const fetchWishlist = createAsyncThunk(
  "products/fetchWishlist",
  async () => {
    const res = await api.get("/wishlist");
    return Array.isArray(res.data) ? res.data : [];
  },
);

export const toggleWishlist = createAsyncThunk(
  "products/toggleWishlist",
  async (id) => {
    const res = await api.post("/wishlist/toggle", {
      productId: id,
    });
    return Array.isArray(res.data) ? res.data : null;
  },
);

const bagSlice = createSlice({
  name: "bag",
  initialState: {
    list: [],
    cart: [],
    wishlist: [],
  },
  reducers: {
    // setProducts(state, action) {
    //   state.list = action.payload || [];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) state.wishlist = action.payload;
      });
  },
});

export const { setProducts } = bagSlice.actions;
export default bagSlice.reducer;

export const selectProducts = (state) => state.bag.list;
export const selectCart = (state) => state.bag.cart;
export const selectWishlist = (state) => state.bag.wishlist;

export const selectCartProducts = (state) => {
  const products = state.products.list || [];
  //   console.log("list",products);
  const cart = state.bag.cart || [];
  //   console.log("cart",cart);

  // Force it to use the ID string as the key
  const cartMap = new Map(
    cart.map((c) => {
      const id = typeof c.product === "object" ? c.product._id : c.product;
      return [id, c.quantity];
    }),
  );
  //   console.log("cartMap", cartMap);

  return products
    .filter((p) => cartMap.has(p._id) || cartMap.has(p.id))
    .map((p) => ({
      ...p,
      quantity: cartMap.get(p._id) || cartMap.get(p.id),
    }));
};

export const selectWishlistProducts = (state) => {
  const products = state.products.list || [];
  const wishIds = new Set(state.bag.wishlist.map((w) => w.product));

  return products.filter((p) => wishIds.has(p._id) || wishIds.has(p.id));
};
