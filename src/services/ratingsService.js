import axios from "axios";

const URL = "http://localhost:8080/api/v1/ratings"; 

// Crear calificación
export const createRating = async (movieId, rating) => {
  try {
    const response = await axios.post(
      `${URL}/create`,
      { movieId, rating }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear calificación:", error);
    throw error;
  }
};

// Leer calificaciones del usuario
export const readRatings = async () => {
  try {
    const response = await axios.get(`${URL}/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener calificaciones:", error);
    throw error;
  }
};

// Eliminar una calificación
export const deleteRating = async (ratingId) => {
  try {
    const response = await axios.delete(`${URL}/delete/${ratingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al eliminar calificación:", error);
    throw error;
  }
};