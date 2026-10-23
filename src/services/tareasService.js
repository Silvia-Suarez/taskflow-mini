import api from "./api";

export const tareasService = {
    getTareas: async (userId) => {
        const response = await api.get(`/tareas?userId=${userId}`);
        return response.data;
    },
    getTareaById: async(userId, id) => {
        const response = await api.get(`/tareas?userId=${userId}&id=${id}`);
        return response.data;
    },
    updateTarea: async(id, datos) => {
        const response = await api.put(`/tareas/${id}`, datos);
        return response.data;
    },
    deleteTarea: async(id, userId) => {
        const response = await api.put(`/tareas/${id}?userId=${userId}`);
        return response.data;
    },
    deleteAllTareas: async(userId) => {
        const response = await api.delete(`/tareas/${userId}`);
        return response.data;
    }
}