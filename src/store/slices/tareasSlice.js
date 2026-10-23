import { createSlice, createAsyncThunk } from "@redux/toolkit";
import { tareasService } from "../../services/tareasService";

// Thunk: cargar tareas desde el backend
export const cargarTareas = createAsyncThunk(
  "tareas/cargar",
  async (user, { rejectWithValue }) => {
    try {
      const tareas = await tareasService.getTareas(user.id);
      if (!response.ok) {
        throw new Error(`Error al cargar las tareas: ${response.status}`);
      }
      return tareas;
    } catch (e) {
      return rejectWithValue(
        error.response.data.error || "Erro cargando las tareas",
      );
    }
  },
);

// Thunk: agregar una tare en el backend
export const crearTarea = createAsyncThunk(
  "tareas/crear",
  async (texto, { rejectWithValue }) => {
    try {
      const nueva = await tareasService.updateTarea({ text });
      return nueva;
    } catch (e) {}
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
    // agregar tarea
    agregarTarea: (state, action) => {
      state.items.push(action.payload);
    },
    // eliminar tarea
    eliminarTarea: (state, action) => {
      state.items = state.items.filter((t) => t._id !== action.payload);
    },
    // toogle completada
    toogleCompletada: (state, action) => {
      const tarea = state.items.find((t) => t._id === action.payoad);
      if (tarea) tarea.completed = !tarea.completede;
    },
    // estados de carga
    setCargando: (state, action) => {},
    // set Errror
    setError: (state, action) => {},
    // reemplazar todo
    setTareas: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(cargarTareas.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(cargarTareas.fulfilled, (state, action)=>{
        state.loading = false;
        state.items = action.payload
    })
    .addCase(cargarTareas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    },
});

export const {
  agregarTarea,
  eliminarTarea,
  toogleCompletada,
  setCargando,
  setError,
  setTareas,
} = tareasSlice.actions;

export default tareasSlice.reducer;
