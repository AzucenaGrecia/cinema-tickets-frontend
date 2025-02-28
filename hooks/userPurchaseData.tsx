import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchMockData = async () => {
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
      }, 1500); // Simulación de espera
    };

    fetchMockData();
  }, []);

  return { data, loading };
}
