import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tareasService } from "../../services/tareasService";

function getErrorMessage(error, fallback) {
  return (
    error.response?.data?.error ||
    error.response?.data?.mensaje ||
    error.message ||
    fallback
  );
}

export const cargarTareas = createAsyncThunk(
  "tareas/cargar",
  async (_, { rejectWithValue }) => {
    try {
      return await tareasService.getTareas();
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Error cargando las tareas"),
      );
    }
  },
);

export const crearTarea = createAsyncThunk(
  "tareas/crear",
  async (texto, { rejectWithValue }) => {
    try {
      return await tareasService.createTarea({ text: texto, title: texto });
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Error creando la tarea"),
      );
    }
  },
);

export const toggleCompletada = createAsyncThunk(
  "tareas/toggleCompletada",
  async ({ id, completed }, { rejectWithValue }) => {
    try {
      return await tareasService.updateTarea(id, { completed: !completed });
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Error actualizando la tarea"),
      );
    }
  },
);

export const eliminarTarea = createAsyncThunk(
  "tareas/eliminar",
  async (id, { rejectWithValue }) => {
    try {
      await tareasService.deleteTarea(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Error eliminando la tarea"),
      );
    }
  },
);

export const eliminarTodas = createAsyncThunk(
  "tareas/eliminarTodas",
  async (_, { rejectWithValue }) => {
    try {
      await tareasService.deleteAllTareas();
      return true;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Error eliminando las tareas"),
      );
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const tareasSlice = createSlice({
  name: "tareas",
  initialState,
  reducers: {
    clearTareasError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(cargarTareas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cargarTareas.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(cargarTareas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(crearTarea.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearTarea.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(crearTarea.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleCompletada.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.items.findIndex(
          (t) => String(t._id || t.id) === String(updated._id || updated.id),
        );
        if (index !== -1) {
          state.items[index] = updated;
        }
      })
      .addCase(toggleCompletada.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(eliminarTarea.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (t) => String(t._id || t.id) !== String(action.payload),
        );
      })
      .addCase(eliminarTarea.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(eliminarTodas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(eliminarTodas.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(eliminarTodas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTareasError } = tareasSlice.actions;

export const selectTareas = (state) => state.tareas.items;
export const selectTareasLoading = (state) => state.tareas.loading;
export const selectTareasError = (state) => state.tareas.error;
export const selectTareaById = (id) => (state) =>
  state.tareas.items.find((t) => String(t._id || t.id) === String(id));

export default tareasSlice.reducer;
