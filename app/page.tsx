import Image from "next/image";

export default function Page() {
  const listOfMovies = [
    {
      title: "The Shawshank Redemption",
      year: 1994,
      director: "Frank Darabont",
    },
    {
      title: "The Godfather",
      year: 1972,
      director: "Francis Ford Coppola",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
    },
    {
      title: "The Shawshank Redemption",
      year: 1994,
      director: "Frank Darabont",
    },
    {
      title: "The Godfather",
      year: 1972,
      director: "Francis Ford Coppola",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
    },
    {
      title: "The Dark Knight",
      year: 2008,
      director: "Christopher Nolan",
    },
  ];

  return (
    <div className="flex flex-col gap-12 p-20 ">
      <div className=" text-cyan-900 text-5xl text-center">
      ¡Bienvenido a CineTicket Pro! 🎬
      </div>

      <div className="bg-fuchsia-50 self-center p-8 rounded-xl w-150">
        <p className="text-2xl pb-8">Selecciona que pelicula veras hoy:</p>
        <div className="grid grid-cols-4 gap-4">
          {listOfMovies.map((movie) => (
            <div className="border-2 border-0 p-4 rounded-xl">
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
