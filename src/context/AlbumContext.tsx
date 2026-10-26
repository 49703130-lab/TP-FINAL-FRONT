import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Figurita, Repetidas } from "../types";

const REPETIDAS_PARA_CANJEAR = 3;

type AlbumContextType = {
  figuritas: Figurita[];
  cargando: boolean;
  pegadas: number[];
  repetidas: Repetidas;
  totalRepetidas: number;
  recibirFigurita: () => number | null; // devuelve el id que salió
  canjear: () => boolean; // 3 repetidas = 1 nueva
};

const AlbumContext = createContext<AlbumContextType | null>(null);

function leer<T>(clave: string, porDefecto: T): T {
  const guardado = localStorage.getItem(clave);
  return guardado ? (JSON.parse(guardado) as T) : porDefecto;
}

export function AlbumProvider({ children }: { children: ReactNode }) {
  const [figuritas, setFiguritas] = useState<Figurita[]>([]);
  const [cargando, setCargando] = useState(true);
  const [pegadas, setPegadas] = useState<number[]>(() => leer("pegadas", []));
  const [repetidas, setRepetidas] = useState<Repetidas>(() =>
    leer("repetidas", {})
  );

  // trae las figuritas del JSON una sola vez, al abrir la página
  useEffect(() => {
    fetch("/figuritas.json")
      .then((res) => res.json())
      .then((data: Figurita[]) => setFiguritas(data))
      .finally(() => setCargando(false));
  }, []);

  // guarda el progreso cada vez que cambia algo
  useEffect(() => {
    localStorage.setItem("pegadas", JSON.stringify(pegadas));
    localStorage.setItem("repetidas", JSON.stringify(repetidas));
  }, [pegadas, repetidas]);

  const totalRepetidas = Object.values(repetidas).reduce((a, b) => a + b, 0);

  // suma una figurita: si ya la tenías va a repetidas, si no se pega
  const agregar = (id: number) => {
    if (pegadas.includes(id)) {
      setRepetidas({ ...repetidas, [id]: (repetidas[id] ?? 0) + 1 });
    } else {
      setPegadas([...pegadas, id]);
    }
  };

  // figurita al azar (la usa el minijuego)
  const recibirFigurita = () => {
    if (figuritas.length === 0) return null;
    const id = figuritas[Math.floor(Math.random() * figuritas.length)].id;
    agregar(id);
    return id;
  };

  // gasta 3 repetidas y da una figurita que todavía no tenés
  const canjear = () => {
    const faltantes = figuritas.filter((f) => !pegadas.includes(f.id));
    if (totalRepetidas < REPETIDAS_PARA_CANJEAR || faltantes.length === 0) {
      return false;
    }

    // descuenta 3 repetidas
    const nuevas = { ...repetidas };
    let aGastar = REPETIDAS_PARA_CANJEAR;
    for (const id of Object.keys(nuevas).map(Number)) {
      const gastar = Math.min(nuevas[id], aGastar);
      nuevas[id] -= gastar;
      aGastar -= gastar;
      if (nuevas[id] === 0) delete nuevas[id];
      if (aGastar === 0) break;
    }
    setRepetidas(nuevas);

    // pega una nueva
    const nueva = faltantes[Math.floor(Math.random() * faltantes.length)];
    setPegadas([...pegadas, nueva.id]);
    return true;
  };

  return (
    <AlbumContext.Provider
      value={{
        figuritas,
        cargando,
        pegadas,
        repetidas,
        totalRepetidas,
        recibirFigurita,
        canjear,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

export function useAlbum() {
  const ctx = useContext(AlbumContext);
  if (!ctx) throw new Error("useAlbum va dentro de <AlbumProvider>");
  return ctx;
}
