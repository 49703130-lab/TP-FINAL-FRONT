import { useAlbum } from "../context/AlbumContext";
import Contador from "./Contador";
import Figurita from "./Figurita";

export default function Album() {
  const { figuritas, cargando, pegadas, repetidas, totalRepetidas, canjear } =
    useAlbum();
  const completo = figuritas.length > 0 && pegadas.length === figuritas.length;

  if (cargando) {
    return <p className="text-center">Cargando figuritas...</p>;
  }

  return (
    <section>
      <Contador pegadas={pegadas.length} total={figuritas.length} />

      <button
        onClick={canjear}
        disabled={totalRepetidas < 3 || completo}
        className="mb-4 rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-40"
      >
        Canjear 3 repetidas ({totalRepetidas})
      </button>

      {completo && (
        <p className="mb-4 rounded-lg bg-green-100 p-3 text-center font-bold">
          ¡Álbum completo! 🎉
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {figuritas.map((f) => (
          <Figurita
            key={f.id}
            {...f}
            pegada={pegadas.includes(f.id)}
            repetidas={repetidas[f.id] ?? 0}
          />
        ))}
      </div>
    </section>
  );
}
