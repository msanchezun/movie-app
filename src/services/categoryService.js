import axios from "axios";

const URL = "http://localhost:8080/api/v1/categories";

const readCategories = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token, inicia sesión primero");
  }

  const response = await axios.get(`${URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200) {
    throw new Error("Error al obtener las categorías");
  }
  return response.data.data;
};

const readCategoryById = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token, inicia sesión primero");
  }

  const response = await axios.get(`${URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status !== 200) {
    throw new Error("Error al obtener la categoría");
  }
  return response.data.data;
};

const createCategory = async (newCategory) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token, inicia sesión primero");
  }

  const response = await axios.post(
    `${URL}/admin/create`,
    newCategory,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (response.status !== 200) {
    throw new Error("Error al crear la categoría");
  }
  return response.data.data;
};

const updateCategory = async (categoryEdited) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token, inicia sesión primero");
  }

  const response = await axios.put(
    `${URL}/admin/update/${categoryEdited.categorieId}`,
    categoryEdited,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (response.status !== 200) {
    throw new Error("Error al actualizar la categoría");
  }
  return response.data.data;
};

const deleteCategory = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No hay token, inicia sesión primero");
  }

  const response = await axios.delete(
    `${URL}/admin/delete/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (response.status !== 200) {
    throw new Error("Error al eliminar la categoría");
  }
  return response.data;
};

export {
  readCategories,
  readCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

