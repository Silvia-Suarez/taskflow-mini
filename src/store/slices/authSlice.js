import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";

function readStoredAuth() {
  try {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      return {
        user: JSON.parse(savedUser),
        token: savedToken,
      };
    }
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }
  return { user: null, token: null };
}

const stored = readStoredAuth();

function getErrorMessage(error, fallback) {
  return (
    error.response?.data?.error ||
    error.response?.data?.mensaje ||
    error.message ||
    fallback
  );
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login({ email, password });
      const { usuario, token } = data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(usuario));
      return { user: usuario, token };
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Error al iniciar sesión"),
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: stored.user,
    token: stored.token,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => !!state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsAdmin = (state) => state.auth.user?.role === "admin";

export default authSlice.reducer;
