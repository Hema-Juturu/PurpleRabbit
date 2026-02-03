import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosInstance";
const LOGIN_URL = "/auth/login";
const REGISTER_URL = "/auth/register";
const LOGOUT_URL = "/auth/logout";
const initialState = {
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  role: "user",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await api.post(LOGIN_URL, credentials);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      const response = await api.post(REGISTER_URL, userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const Logout = createAsyncThunk("auth/Logout", async (_, thunkAPI) => {
 
  try {
    const response = await api.get(LOGOUT_URL);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user"); 
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Logout failed",
    );
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: (builder) => {
    const handleAuthSuccess = (state, action) => {
      state.isLoading = false;
      const { token } = action.payload;
      state.token = token;
      state.role = action.payload.user.role;
      localStorage.setItem("role", action.payload.user.role);
      localStorage.setItem("token", token);
    };

    const handleAuthPending = (state) => {
      state.isLoading = true;
      state.error = null;
    };

    const handleAuthRejected = (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.error = action.payload;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    };

    builder
      .addCase(loginUser.pending, handleAuthPending)
      .addCase(loginUser.fulfilled, handleAuthSuccess)
      .addCase(loginUser.rejected, handleAuthRejected)

      .addCase(registerUser.pending, handleAuthPending)
      .addCase(registerUser.fulfilled, handleAuthSuccess)
      .addCase(registerUser.rejected, handleAuthRejected)
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.isLoading = false;
        state.token = null;
        state.role = null;
        state.user = null; 
        state.error = null;
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      })
      .addCase(Logout.rejected, handleAuthRejected);
  },
});

export const selectCurrentUser = (state) => state.auth.token;
export const selectUserRole = (state) => state.auth.role;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
