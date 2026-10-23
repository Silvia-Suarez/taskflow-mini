import api from "./api";

export const authService = {
  registrar: async (datos) => {
    const response = await api.post("/auth/registrar", datos);
    return response.data;
  },
  login: async (datos) => {
    const response = await api.post("/auth/login", datos);
    return response.data;
  },
  perfil: async () => {
    const response = await api.get("/auth/perfil");
    return response.data;
  },
};
