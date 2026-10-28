import api from "./api";

export const tareasService = {
  getTareas: async () => {
    const response = await api.get("/tareas");
    return response.data.tareas;
  },
  getTareaById: async (id) => {
    const response = await api.get(`/tareas/${id}`);
    return response.data.tarea;
  },
  createTarea: async (datos) => {
    const response = await api.post("/tareas", datos);
    return response.data.tarea;
  },
  updateTarea: async (id, datos) => {
    const response = await api.put(`/tareas/${id}`, datos);
    return response.data.tarea;
  },
  deleteTarea: async (id) => {
    const response = await api.delete(`/tareas/${id}`);
    return response.data;
  },
  deleteAllTareas: async () => {
    const response = await api.delete("/tareas");
    return response.data;
  },
};
