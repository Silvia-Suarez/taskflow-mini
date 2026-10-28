import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import tareasReducer from "./slices/tareasSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tareas: tareasReducer,
  },
});
