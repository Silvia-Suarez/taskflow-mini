import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

// Thunk: login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (e) {
      return rejectWithValue(
        e.response.data.error || "Error al iniciar sesión",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    usuario: null,
    loading: false,
    error: null,
  },
  redurcers: {
    // ....
  }
});
