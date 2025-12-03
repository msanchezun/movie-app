import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Swal from "sweetalert2";
import { AuthContext } from "../services/authContext";
import { readCategoryById, updateCategory } from "../services/categoryService";

const UpdateCategoryView = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { isLogged } = useContext(AuthContext);

  const [category, setCategory] = useState({ nameCategorie: "" });

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!isLogged || role !== "admin") {
      navigate("/"); 
      return;
    }

 
    const fetchCategory = async () => {
      try {
        const data = await readCategoryById(id);
        setCategory(data); 
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo cargar la categoría", "error");
        navigate("/categories");
      }
    };

    fetchCategory();
  }, [isLogged, navigate, id]);

  const handleInput = (ev) => {
    const { name, value } = ev.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!category.nameCategorie.trim()) {
      Swal.fire("Error", "El nombre de la categoría es obligatorio", "error");
      return;
    }

    try {
      await updateCategory(category); 
      Swal.fire("Éxito", "Categoría actualizada correctamente", "success");
      navigate("/categories");
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.message || "No se pudo actualizar la categoría",
        "error"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold pb-3">Actualizar Categoría</h1>

      <form onSubmit={handleSubmit}>
        <Input
          name="nameCategorie"
          label="Nombre de la categoría"
          type="text"
          handleInput={handleInput}
          value={category}
        />

        <button type="submit" className="btn btn-primary mt-4">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryView;