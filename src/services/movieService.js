import axios from "axios";

const URL = "http://localhost:8080/api/v1/movies";

const readMovies = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, inicia sesión primero");

  const response = await axios.get(`${URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) throw new Error("Error al obtener las películas");

  return response.data.data;
};

const readMovieById = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, inicia sesión primero");

  const response = await axios.get(`${URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) throw new Error("Error al obtener la película");

  return response.data.data;
};

const createMovie = async (newMovie) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, inicia sesión primero");

  const response = await axios.post(`${URL}/admin/create`, newMovie, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) throw new Error("Error al crear la película");

  return response.data.data;
};

const updateMovie = async (id, movieEdited) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, inicia sesión primero");

  const response = await axios.put(`${URL}/admin/update/${id}`, movieEdited, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) throw new Error("Error al actualizar la película");

  return response.data.data;
};

const deleteMovie = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, inicia sesión primero");

  const response = await axios.delete(`${URL}/admin/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (response.status !== 200) {
    throw new Error("Error al eliminar la película");
  }

  return response.data;
};

const searchMovies = async (filters) => {
  try {
    const params = {};

    // Solo se agregan los filtros que NO estén vacíos
    if (filters.nameMovie) params.nameMovie = filters.nameMovie;
    if (filters.releaseYear) params.releaseYear = filters.releaseYear;
    if (filters.synopsis) params.synopsis = filters.synopsis;
    if (filters.nameCategorie) params.nameCategorie = filters.nameCategorie;

    // Siempre enviamos el orden, por defecto DESC
    params.order = filters.order || "DESC";

    const response = await axios.get(`${URL}/search`, {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.data; // Tu backend envía { status, success, message, data }
  } catch (error) {
    console.error("Error en búsqueda:", error);
    throw error;
  }
};

export {
  readMovies,
  readMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
};