"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import movies from "../../../../data/movies.json";

const schema = z.object({
  username: z.string().min(1, "El nombre es obligatorio"),
  tickets: z.number().min(1, "Debes comprar al menos 1 boleto"),
  date: z.enum(["Hoy", "Mañana", "Pasado mañana"]),
  time: z.enum(["1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"]),
  seats: z.array(z.string()).min(1, "Debes seleccionar al menos un asiento"),
});

export default function PurchasePage({ params }: { params: { title: string } }) {
  const router = useRouter();
  const decodedTitle = decodeURIComponent(params.title);
  const movie = movies.find((m) => m.title === decodedTitle);

  if (!movie) {
    return <p className="text-red-500 text-center mt-10">Película no encontrada.</p>;
  }

  const ticketPrice = movie.price; // Precio único por película
  const [totalPrice, setTotalPrice] = useState(ticketPrice);
  const availableSeats = Array.from({ length: 20 }, (_, i) => `A${i + 1}`);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      tickets: 1,
      date: "Hoy",
      time: "1 PM",
      seats: [],
    },
  });

  const tickets = watch("tickets");

  const handleTicketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numTickets = Number(e.target.value);
    setTotalPrice(numTickets * ticketPrice);
    setSelectedSeats([]);
  };

  const handleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < tickets) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Compra realizada:", { ...data, seats: selectedSeats });
    router.push("/confirmation");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/2 bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-cyan-900 text-center">
          🎟️ Compra de Boletos
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <label className="block text-lg font-semibold">👤 Nombre:</label>
          <input
            {...register("username")}
            className="w-full border p-2 rounded mt-1"
            placeholder="Ingresa tu nombre"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          <label className="block mt-4 text-lg font-semibold">🎬 Película:</label>
          <input
            value={movie.title}
            disabled
            className="w-full border p-2 rounded mt-1 bg-gray-100"
          />

          <label className="block mt-4 text-lg font-semibold">💲 Precio unitario:</label>
          <input
            value={`$${ticketPrice}`}
            disabled
            className="w-full border p-2 rounded mt-1 bg-gray-100"
          />

          <label className="block mt-4 text-lg font-semibold">🎟️ Número de boletos:</label>
          <input
            type="number"
            {...register("tickets", { valueAsNumber: true })}
            className="w-full border p-2 rounded mt-1"
            min={1}
            onChange={handleTicketChange}
          />
          {errors.tickets && <p className="text-red-500">{errors.tickets.message}</p>}

          <label className="block mt-4 text-lg font-semibold">💰 Precio total:</label>
          <input
            value={`$${totalPrice}`}
            disabled
            className="w-full border p-2 rounded mt-1 bg-gray-100"
          />

          <label className="block mt-4 text-lg font-semibold">📅 Selecciona fecha:</label>
          <select {...register("date")} className="w-full border p-2 rounded mt-1">
            <option value="Hoy">Hoy</option>
            <option value="Mañana">Mañana</option>
            <option value="Pasado mañana">Pasado mañana</option>
          </select>

          <label className="block mt-4 text-lg font-semibold">⏰ Selecciona horario:</label>
          <select {...register("time")} className="w-full border p-2 rounded mt-1">
            <option value="1 PM">1 PM</option>
            <option value="2 PM">2 PM</option>
            <option value="3 PM">3 PM</option>
            <option value="4 PM">4 PM</option>
            <option value="5 PM">5 PM</option>
            <option value="6 PM">6 PM</option>
            <option value="7 PM">7 PM</option>
          </select>

          <label className="block mt-4 text-lg font-semibold">🪑 Selecciona tus asientos:</label>
          <div className="grid grid-cols-5 gap-2 mt-2">
            {availableSeats.map((seat) => (
              <button
                key={seat}
                type="button"
                className={`p-2 border rounded w-14 ${
                  selectedSeats.includes(seat) ? "bg-green-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleSeatSelection(seat)}
                disabled={selectedSeats.length >= tickets && !selectedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
          {errors.seats && <p className="text-red-500">{errors.seats.message}</p>}

          <button
            type="submit"
            className="mt-6 w-full bg-cyan-900 text-white p-3 rounded-xl hover:bg-cyan-700 transition"
          >
            🛒 Comprar Boletos
          </button>
        </form>
      </div>
    </div>
  );
}
