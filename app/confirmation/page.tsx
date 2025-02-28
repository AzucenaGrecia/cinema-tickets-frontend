"use client";

import { useRouter } from "next/navigation";
import { usePurchaseData } from "../../hooks";

export default function ConfirmationPage() {
  const router = useRouter();
  const { data: purchaseData, loading } = usePurchaseData();

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Cargando datos...</p>;
  }

  if (!purchaseData) {
    return <p className="text-red-500 text-center mt-10">Error al cargar los datos.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/2 bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-cyan-900">🎉 ¡Compra Exitosa!</h1>
        <p className="mt-4 text-lg text-gray-700">
          Gracias por tu compra, <span className="font-semibold">{purchaseData.username}</span> 🎟️
        </p>
        <p className="text-gray-600">
          Te hemos enviado un correo de confirmación a <span className="font-semibold">{purchaseData.userEmail}</span>.
        </p>

        <div className="mt-6 border-t pt-4 text-left">
          <h2 className="text-xl font-semibold text-cyan-900">📜 Detalles de la compra</h2>
          <p className="mt-2"><span className="font-semibold">🎬 Película:</span> {purchaseData.movie}</p>
          <p><span className="font-semibold">📅 Fecha:</span> {purchaseData.date}</p>
          <p><span className="font-semibold">⏰ Horario:</span> {purchaseData.time}</p>
          <p><span className="font-semibold">🎟️ Boletos comprados:</span> {purchaseData.tickets}</p>
          <p><span className="font-semibold">🪑 Asientos:</span> {purchaseData.seats.join(", ")}</p>
          <p><span className="font-semibold">💰 Total pagado:</span> {purchaseData.totalPrice} PEN</p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-cyan-900 text-white p-3 rounded-xl hover:bg-cyan-700 transition"
        >
          ⬅️ Volver al inicio
        </button>
      </div>
    </div>
  );
}
