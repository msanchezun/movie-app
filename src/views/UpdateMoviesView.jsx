import { useState, useEffect, useContext } from "react";
import Input from "../components/Input";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../services/authContext";
import { readCategories } from "../services/categoryService";
import { readMovieById, updateMovie } from "../services/movieService";

const UpdateMoviesView = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { isLogged } = useContext(AuthContext);
  const [movie, setMovie] = useState({
    nameMovie: "",
    categories: [], 
    releaseYear: "",
    synopsis: "",
  });
  const [allCategories, setAllCategories] = useState([]);
  

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (!isLogged || role !== "admin") {
      navigate("/");
    }
    const fetchData = async () => {

      try {
        const categoriesData = await readCategories();
        setAllCategories(
          categoriesData.map((cat) => ({
            value: cat.categorieId,
            label: cat.nameCategorie,
          }))
        );

        const movieData = await readMovieById(id); 

        if (!movieData) {
          Swal.fire("Error", "Película no encontrada", "error");
          return;
        }

        const categoryIds = categoriesData
          .filter((cat) => movieData.nameCategories?.includes(cat.nameCategorie))
          .map((cat) => cat.categorieId);
          
        setMovie({
          nameMovie: movieData.nameMovie || "",
          categories: categoryIds,
          releaseYear: movieData.releaseYear || "",
          synopsis: movieData.synopsis || "",
        });

      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo cargar la película", "error");
      }
    };

    fetchData();
  }, [isLogged, navigate, id]);

  const inputsInfo = [
    { name: "nameMovie", label: "Nombre de la película", type: "text" },
    { name: "releaseYear", label: "Año de lanzamiento", type: "number" },
    { name: "synopsis", label: "Sinopsis", type: "textarea" },
  ];

  const handleInput = (ev) => {
    const { name, value } = ev.target;
    setMovie({ ...movie, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!movie.nameMovie.trim()) {
      Swal.fire("Error", "El nombre de la película es obligatorio", "error");
      return;
    }
    if (movie.categories.length === 0) {
      Swal.fire("Error", "Debes seleccionar al menos una categoría", "error");
      return;
    }
    if (!movie.releaseYear.trim()) {
      Swal.fire("Error", "El año de lanzamiento es obligatorio", "error");
      return;
    }
    if (!movie.synopsis.trim()) {
      Swal.fire("Error", "La sinopsis es obligatoria", "error");
      return;
    }

    try {
      await updateMovie(id, movie); 
      Swal.fire("Éxito", "Película actualizada correctamente", "success");
      navigate("/movies");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          Swal.fire("Error", error.response.data.message, "error");
        } else {
          Swal.fire(
            "Error",
            error.response.data.message || "Ocurrió un error",
            "error"
          );
        }
      } else {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold pb-3">Actualizar Película</h1>

      <form onSubmit={handleSubmit}>
        {inputsInfo.map((item, index) => (
            <Input
                key={index}
                name={item.name}
                label={item.label}
                type={item.type}
                handleInput={handleInput}
                value={movie} 
            />
            ))}

        {/* Selector de categorías con checkboxes */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Categorías</label>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => (
              <label key={cat.value} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={movie.categories.includes(cat.value)}
                  onChange={(e) => {
                    const catId = cat.value;
                    setMovie((prev) => ({
                      ...prev,
                      categories: e.target.checked
                        ? [...prev.categories, catId]
                        : prev.categories.filter((id) => id !== catId),
                    }));
                  }}
                />
                {cat.label}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateMoviesView;