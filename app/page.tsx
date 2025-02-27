"use client";

import Image from "next/image";
import movies from "../data/movies.json";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();

  const handleMovieClick = (title: string) => {
    router.push(`/movie/${encodeURIComponent(title)}`);
  };

  return (
    <div className="flex flex-col gap-12 p-20 ">
      <div className=" text-cyan-900 text-5xl text-center">
        ¡Bienvenido a CineTicket Pro! 🎬
      </div>

      <div className="bg-fuchsia-50 self-center p-8 rounded-xl w-150">
        <p className="text-2xl pb-8">Selecciona que pelicula veras hoy:</p>
        <div className="grid grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.title}
              className="border-2 border-0 p-4 rounded-xl"
              onClick={() => handleMovieClick(movie.title)}
            >
              <div className="flex justify-center pb-3">
                <Image
                  src="/film-reel.png"
                  width={50}
                  height={50}
                  alt="Picture of the movie"
                />
              </div>

              <div className="text-1xl text-center">{movie.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
