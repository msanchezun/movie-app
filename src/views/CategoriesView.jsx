import { useState, useEffect, useContext } from "react";
import { readCategories, deleteCategory } from "../services/categoryService";
import TableData from "../components/TableData";
import { Pencil, Trash } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authContext";

const CategoriesView = () => {
  const [categories, setCategories] = useState([]);
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();    

  const headersData = [
    { name: "categorieId", label: "ID" },
    { name: "nameCategorie", label: "Nombre categoría" },
  ];


  const handleDelete = async (category) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar categoría?",
      text: `Se eliminará ${category.nameCategorie}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCategory(category.categorieId);
        Swal.fire("Eliminada", "Categoría eliminada correctamente", "success");
        setCategories((prev) =>
          prev.filter((c) => c.categorieId !== category.categorieId)
        );
        
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudo eliminar la categoría", "error");
      }
    }
  };

  const actions = [
    {
      content: (category) => (
        <button
          className="btn btn-sm btn-warning mr-2"
          onClick={() => navigate(`/categories/admin/update/${category.categorieId}`)}
        >
          <Pencil />
        </button>
      ),
    },
    {
      content: (category) => (
        <button
          className="btn btn-sm btn-error"
          onClick={() => handleDelete(category)}
        >
          <Trash />
        </button>
      ),
    },
  ];

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!isLogged || role !== "admin") {
      setCategories([]);       
      navigate("/");           
      return;
    }

    const fetchCategories = async () => {
      try {
        const categoriesArray = await readCategories(); 
        setCategories(categoriesArray);        
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar las categorías", "error");
      }
    };

    fetchCategories();
  }, [isLogged, navigate]);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Categorías</h1>
      <TableData data={categories} headers={headersData} actions={actions} />
    </div>
  );
};

export default CategoriesView;