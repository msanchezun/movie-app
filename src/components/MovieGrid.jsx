import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies = [], role, onEdit, onDelete, onRate }) => {
  if (!movies.length) {
    return <p className="text-center py-8 text-gray-500">No hay películas para mostrar.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.movieId}
          movie={movie}
          role={role}
          onEdit={onEdit}
          onDelete={onDelete}
          onRate={onRate}
        />
      ))}
    </div>
  );
};

export default MovieGrid;