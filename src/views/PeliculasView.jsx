import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authContext";
import { readMovies, deleteMovie, searchMovies } from "../services/movieService";
import { readRatings, createRating } from "../services/ratingsService";
import MovieGrid from "../components/MovieGrid";
import Swal from "sweetalert2";

const PeliculasView = () => {
  const { isLogged } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); 

  useEffect(() => {
    if (!isLogged) {
      setMovies([]);
      navigate("/");
      return;
    }

    const fetchMoviesAndRatings = async () => {
      try {
        const moviesRes = await readMovies();

        // Si es usuario, cargamos también sus ratings
        let ratingsMap = {};

        if (role === "user") {
          const ratingsRes = await readRatings();
          const ratingsArray = ratingsRes.data || [];

          
          ratingsMap = ratingsArray.reduce((acc, item) => {
            acc[item.nameMovie] = item.rating;
            return acc;
          }, {});
        }


        const moviesWithRatings = moviesRes.map((m) => ({
          ...m,
          rating: ratingsMap[m.nameMovie] || 0,
        }));

        setMovies(moviesWithRatings);

      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar las películas", "error");
      }
    };

    fetchMoviesAndRatings();
  }, [isLogged, navigate, role]);


  const handleEdit = (movie) => {
    navigate(`/movies/admin/update/${movie.movieId}`);
  };

  const handleDelete = async (movie) => {
    const confirm = await Swal.fire({
      title: `¿Deseas eliminar ${movie.nameMovie}?`,
      text: "Esta acción es irreversible.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      showConfirmButton: true,
      confirmButtonText: "Sí, eliminar",
      theme: "dark",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteMovie(movie.movieId);
        setMovies((prev) => prev.filter((m) => m.movieId !== movie.movieId));
        Swal.fire("Éxito", "Película eliminada correctamente", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo eliminar la película", "error");
      }
    }
  };

  const handleRate = async (movie, stars) => {
  try {
    const res = await createRating(movie.movieId, stars);

    Swal.fire({
      icon: "success",
      title: "Calificación registrada",
      text: res.message || "Calificación creada correctamente",
    });

    // Actualizar la calificación en pantalla
    setMovies((prev) =>
      prev.map((m) =>
        m.movieId === movie.movieId
          ? { ...m, rating: stars }
          : m
      )
    );

  } catch (error) {

    if (error.response?.status === 409) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: error.response.data.message + "Si deseas volverla a calificar eliminala de tus calificaciones" || "Ya calificaste esta película.",
      });
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo registrar la calificación",
    });

    console.error("Error al registrar calificación:", error);
  }
};

const [filters, setFilters] = useState({
  nameMovie: "",
  releaseYear: "",
  synopsis: "",
  nameCategorie: "",
  order: "DESC",
});

const handleSearch = async () => {
  try {
    const results = await searchMovies(filters);
    setMovies(results);

  } catch (err) {
    console.error(err);

    const backendMessage =
      err.response?.data?.message || "No se pudo realizar la búsqueda";

    Swal.fire("Error", backendMessage, "error");
  }
};

const handleClear = async () => {
  setFilters({
    nameMovie: "",
    releaseYear: "",
    synopsis: "",
    nameCategorie: "",
    order: "DESC",
  });

  const res = await readMovies();
  setMovies(res);
};

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Películas</h1>
      
      <div className="flex gap-3 mb-6">
  <input
    type="text"
    placeholder="Nombre..."
    className="input input-bordered w-full max-w-xs"
    value={filters.nameMovie}
    onChange={(e) => setFilters({ ...filters, nameMovie: e.target.value })}
  />

  <button
    className="btn btn-primary"
    onClick={handleSearch}
  >
    Buscar
  </button>

  <button
    className="btn btn-ghost"
    onClick={handleClear}
  >
    Limpiar
  </button>
</div>

      <MovieGrid
        movies={movies}
        role={role}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRate={handleRate}
      />
    </div>
  );
};

export default PeliculasView;