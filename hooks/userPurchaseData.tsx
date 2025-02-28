import { useEffect, useState } from "react";
import axios from "axios";

interface PurchaseData {
  username: string;
  userEmail: string;
  movie: string;
  date: string;
  time: string;
  tickets: number;
  totalPrice: number;
  seats: string[];
}

export function usePurchaseData() {
  const [data, setData] = useState<PurchaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);

      // 🔹 Simulación de llamada a API (Reemplazar cuando haya un endpoint real)
      setTimeout(() => {
        setData({
          username: "Juan Pérez",
          userEmail: "juan.perez@email.com",
          movie: "Inception",
          date: "Mañana",
          time: "5 PM",
          tickets: 2,
          totalPrice: 40,
          seats: ["A5", "A6"],
        });
        setLoading(false);
      }, 1500);

      // 🚀 ⚡️ Cuando haya un backend real, usar este código en vez del `setTimeout`
      /*
      const response = await axios.get("https://api.example.com/purchase-data");
      setData(response.data);
      */

    } catch (err) {
      setError("Error al obtener los datos de la compra.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
}
