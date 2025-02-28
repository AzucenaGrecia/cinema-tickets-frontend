"use client";

import Image from "next/image";
// import movies from "../data/movies.json";
import { useRouter } from "next/navigation";
import useMovies from "../hooks/useMovies";

export default function Page() {
  const { movies, loading, error } = useMovies();
  console.log('movies!!', movies)

  if (loading) return <p>🎬 Cargando películas...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  
  const router = useRouter();

  const handleMovieClick = (title: string) => {
    router.push(`/movie/${encodeURIComponent(title)}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-cyan-900 text-5xl font-bold text-center mb-8">
        🎬 ¡Bienvenido a CineTicket Pro!
      </h1>

      <div className="bg-white p-10 rounded-xl shadow-lg w-3/4">
        <p className="text-2xl text-gray-700 text-center mb-6">
          Selecciona la película que verás hoy:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.title}
              className="p-4 bg-gray-100 rounded-xl shadow-md hover:bg-gray-200 transition cursor-pointer flex flex-col items-center"
              onClick={() => handleMovieClick(movie.title)}
            >
              <Image
                src="/film-reel.png"
                width={70}
                height={70}
                alt="Movie Icon"
                className="mb-3"
              />
              <p className="text-lg font-semibold text-cyan-900 text-center">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
