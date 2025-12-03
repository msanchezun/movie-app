import { useState, useEffect, useContext } from "react";
import { readRatings, deleteRating } from "../services/ratingsService";
import { Trash, Star } from "lucide-react";
import Swal from "sweetalert2";
import { AuthContext } from "../services/authContext";
import { useNavigate } from "react-router-dom";

const RatingsView = () => {
  const [ratings, setRatings] = useState([]);
  const { isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  const renderStars = (score) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={20}
          className="mr-1"
          strokeWidth={1.5}
          fill={i <= score ? "#facc15" : "none"}  // rellena o vacía
          stroke={i <= score ? "#facc15" : "#a1a1aa"} // borde
        />
      );
    }
    return <div className="flex items-center">{stars}</div>;
  };

  const handleDelete = async (ratingItem) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar calificación?",
      text: `Eliminarás tu calificación de ${ratingItem.movie}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteRating(ratingItem.movieId);
      Swal.fire("Eliminada", "Calificación eliminada correctamente", "success");

      setRatings((prev) =>
        prev.filter((r) => r.movieId !== ratingItem.movieId)
      );
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudo eliminar la calificación", "error");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!isLogged || !role) {
      setRatings([]);
      navigate("/");
      return;
    }

    const fetchRatings = async () => {
      try {
        const response = await readRatings();
        setRatings(response.data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudieron cargar las calificaciones", "error");
      }
    };

    fetchRatings();
  }, [isLogged, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Mis Calificaciones</h1>

      {ratings.length === 0 ? (
        <p className="text-gray-500">No tienes calificaciones registradas.</p>
      ) : (
        <ul className="space-y-3">
          {ratings.map((rating) => (
            <li
              key={rating.movieId}
              className="flex justify-between items-center p-4 bg-base-200 rounded-lg shadow-sm"
            >
              <div>
                <p className="font-medium mb-1">{rating.nameMovie}</p>
                {renderStars(rating.rating)}
              </div>

              <button
                className="btn btn-sm btn-error"
                onClick={() => handleDelete(rating)}
              >
                <Trash size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RatingsView;