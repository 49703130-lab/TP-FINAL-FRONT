import type { Figurita as FiguritaType } from "../types";

type Props = FiguritaType & {
  pegada: boolean;
  repetidas: number;
};

export default function Figurita({ id, nombre, emoji, pegada, repetidas }: Props) {
  return (
    <div
      className={`relative flex h-32 flex-col items-center justify-center rounded-xl border-2 ${
        pegada
          ? "border-yellow-400 bg-yellow-50"
          : "border-dashed border-gray-300 bg-gray-100"
      }`}
    >
      {pegada ? (
        <>
          <span className="text-4xl">{emoji}</span>
          <span className="mt-1 text-sm font-semibold">{nombre}</span>
        </>
      ) : (
        <span className="text-2xl text-gray-400">#{id}</span>
      )}

      {repetidas > 0 && (
        <span className="absolute right-1 top-1 rounded-full bg-red-500 px-2 text-xs text-white">
          x{repetidas}
        </span>
      )}
    </div>
  );
}
