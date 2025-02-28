"use client";

import movies from "../../../data/movies.json";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";

export default function MoviePage({ params }: { params: { title: string } }) {
  const router = useRouter();
  const decodedTitle = decodeURIComponent(params.title);
  const movie = movies.find((m) => m.title === decodedTitle);

  if (!movie) {
    return notFound(); // Si la película no existe, mostrar error 404
  }

  const handlePurchaseClick = () => {
    router.push(`/movie/${encodeURIComponent(movie.title)}/purchase`);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96">
        <Image
          src="/film-reel.png"
          width={200}
          height={200}
          alt={`Imagen de ${movie.title}`}
          className="mx-auto mb-4"
        />

        <h1 className="text-3xl font-bold text-cyan-900 text-center">
          {movie.title}
        </h1>
        <p className="text-lg text-gray-700 mt-2 text-center">
          {movie.description}
        </p>

        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">🎬 Director: {movie.director}</p>
          <p className="text-md text-gray-600">📅 Año: {movie.year}</p>
          <p className="text-xl font-bold text-green-700 mt-4">
            💲 Precio: ${movie.price}
          </p>
        </div>

        <button
          onClick={handlePurchaseClick}
          className="mt-6 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full"
        >
          Comprar Ticket
        </button>

        {/* 🔹 Botón de Regreso */}
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          ⬅️ Regresar
        </button>
      </div>
    </div>
  );
}
