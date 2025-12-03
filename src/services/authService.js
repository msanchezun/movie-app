import axios from "axios";

// URL base de tu API en Java
const API_URL = "http://localhost:8080/api/v1/user";

export const loginService = async (correo, clave) => {
  try {
    const payload = { email:correo, password:clave };

    console.log("JSON enviado al backend:", payload);

    const response = await axios.post(`${API_URL}/auth/login`, payload);

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error al conectar con el servidor" };
  }
};