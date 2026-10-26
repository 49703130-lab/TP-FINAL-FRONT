import { AlbumProvider } from "./context/AlbumContext";
import Album from "./components/Album";
import MiniJuego from "./components/MiniJuego";

export default function App() {
  return (
    <AlbumProvider>
      <main className="mx-auto max-w-3xl p-6">
        <h1 className="mb-6 text-3xl font-bold">Álbum de figuritas</h1>
        <MiniJuego />
        <Album />
      </main>
    </AlbumProvider>
  );
}
