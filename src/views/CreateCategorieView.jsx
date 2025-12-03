import { useState, useEffect, useContext } from "react";
import Input from "../components/Input";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authContext";
import { createCategory } from "../services/categoryService"; 

const CreateCategorieView = () => {
  const [category, setCategory] = useState({ nameCategorie: "" });
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!isLogged || role !== "admin") {
      navigate("/"); 
    }
  }, [isLogged, navigate]);

  const inputsInfo = [
    { name: "nameCategorie", label: "Nombre de la categoría", type: "text" }
  ];

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
      await createCategory(category); 
      Swal.fire("Éxito", "Categoría creada correctamente", "success");
      setCategory({ nameCategorie: "" });
      navigate("/categories");
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.message || "No se pudo crear la categoría",
        "error"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold pb-3">Crear Categoría</h1>

      <form onSubmit={handleSubmit}>
        {inputsInfo.map((item, index) => (
          <Input
            key={index}
            name={item.name}
            label={item.label}
            type={item.type}
            handleInput={handleInput}
            value={category}
          />
        ))}

        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CreateCategorieView;