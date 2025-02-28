import { useState, useEffect } from "react";
import axios from "axios";
import moviesList from "../data/movies.json";

interface Movie {
  id: number;
  title: string;
  year: number;
  director: string;
  description: string;
  price: number;
}

export default function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // 🔹 Reemplaza esta línea cuando tengas la API real
        // const response = await axios.get("https://tu-api.com/movies");
        // setMovies(response.data);

        // 🔹 Simulación de datos (por ahora)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un retraso de 1s
        setMovies(moviesList);
      } catch (error) {
        setError("Error al obtener las películas. Inténtalo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading, error };
}
