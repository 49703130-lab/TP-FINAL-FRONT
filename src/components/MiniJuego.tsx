import { useState } from "react";
import { useAlbum } from "../context/AlbumContext";

// Minijuego: adiviná el número del 1 al 5. Si acertás, te llevás una figurita.
export default function MiniJuego() {
  const { figuritas, recibirFigurita } = useAlbum();
  const [mensaje, setMensaje] = useState("Elegí un número del 1 al 5");

  const jugar = (elegido: number) => {
    const secreto = Math.floor(Math.random() * 5) + 1;

    if (elegido === secreto) {
      const id = recibirFigurita();
      const figu = figuritas.find((f) => f.id === id);
      setMensaje(`¡Acertaste! Ganaste: ${figu?.emoji} ${figu?.nombre}`);
    } else {
      setMensaje(`Era el ${secreto}. ¡Probá de nuevo!`);
    }
  };

  return (
    <section className="mb-8 rounded-xl border p-4 text-center">
      <h2 className="mb-2 text-xl font-bold">Minijuego</h2>
      <p className="mb-3">{mensaje}</p>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => jugar(n)}
            className="h-10 w-10 rounded-lg bg-yellow-400 font-bold"
          >
            {n}
          </button>
        ))}
      </div>
    </section>
  );
}
