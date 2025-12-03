import React from "react";
import { Pencil, Trash, Star } from "lucide-react";

const MovieCard = ({ movie, role, onEdit, onDelete, onRate }) => {
 
  const imgUrl = `https://picsum.photos/400/250?random=${movie.movieId}`;
  const rating = movie.rating || 0;

  return (
    <div className="card bg-base-100 shadow-md rounded-lg overflow-hidden max-w-sm">
      <figure>
        <img src={imgUrl} alt={movie.nameMovie} className="w-full h-56 object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-lg font-bold">{movie.nameMovie} ({movie.releaseYear})</h2>

        <p className="text-sm text-gray-500 mt-1">
          Categorías: {movie.nameCategories.join(", ")}
        </p>

        <p className="text-sm text-gray-700 mt-2">
          {movie.synopsis}
        </p>

        <div className="card-actions mt-4 justify-center">
          {role === "admin" && (
            <>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => onEdit(movie)}
              >
                <Pencil size={16} />
              </button>
              <button
                className="btn btn-sm btn-error"
                onClick={() => onDelete(movie)}
              >
                <Trash size={16} />
              </button>
            </>
          )}

          {role === "user" && (
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  className="btn btn-ghost btn-sm btn-square p-1"
                  onClick={() => onRate(movie, star)}
                >
                  <Star
                    size={16}
                    className={`text-yellow-400 ${star <= rating ? "fill-current" : "opacity-40"}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;