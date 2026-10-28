import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Input from "../components/inputs/Input";
import { Button } from "../components/buttons/Buttons";
import LiveChat from "../components/live/LiveChat";
import { selectUser } from "../store/slices/authSlice";

/**
 * Socket contract (backend should match):
 * Client → server:
 *   usuario:unirse(nombre: string)
 * Server → client:
 *   usuarios:lista([{ id, nombre }, ...])
 */
function Live() {
  const { socket, conectado } = useContext(SocketContext);
  const user = useSelector(selectUser);
  const [nombre, setNombre] = useState(
    () => sessionStorage.getItem("nombreLive") || "",
  );
  const [borrador, setBorrador] = useState(
    () => sessionStorage.getItem("nombreLive") || user?.name || "",
  );
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    function onLista(lista) {
      setUsuarios(Array.isArray(lista) ? lista : []);
    }
    socket.on("usuarios:lista", onLista);
    return () => socket.off("usuarios:lista", onLista);
  }, [socket]);

  // Re-announce identity on (re)connect
  useEffect(() => {
    if (nombre && conectado) {
      socket.emit("usuario:unirse", nombre);
    }
  }, [nombre, conectado, socket]);

  function entrar(e) {
    e.preventDefault();
    const limpio = borrador.trim();
    if (!limpio) return;
    sessionStorage.setItem("nombreLive", limpio);
    setNombre(limpio);
  }

  function salir() {
    sessionStorage.removeItem("nombreLive");
    setNombre("");
    setBorrador(user?.name || "");
    setUsuarios([]);
  }

  return (
    <div className="min-h-screen bg-app-bg transition-colors duration-300">
      <NavBar />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-app-text mb-2">Live</h1>
        <p className="text-app-muted mb-6">
          Chat en tiempo real con Socket.IO
        </p>

        {!nombre ? (
          <Card className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-app-text mb-2">
              Elige un nombre
            </h2>
            <p className="text-sm text-app-muted mb-4">
              Así te verán los demás en el chat en vivo.
            </p>
            <form onSubmit={entrar} className="flex flex-col gap-3">
              <Input
                type="text"
                value={borrador}
                onChange={(e) => setBorrador(e.target.value)}
                placeholder="Tu nombre"
                label="Nombre"
              />
              <Button type="submit" disabled={!borrador.trim()}>
                Entrar al live
              </Button>
            </form>
            {!conectado && (
              <p className="text-xs text-amber-600 dark:text-amber-300 mt-3">
                El servidor aún no está conectado (puerto 3001). Puedes
                elegir nombre; el chat se activará al conectar.
              </p>
            )}
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-app-muted">
                  Conectado como{" "}
                  <span className="font-semibold text-app-text">{nombre}</span>
                </p>
                <Button variant="neutral" size="sm" onClick={salir}>
                  Salir
                </Button>
              </div>
              <LiveChat />
            </Card>

            <Card className="p-4 h-fit">
              <h3 className="font-bold text-app-text mb-3">
                En línea ({usuarios.length})
              </h3>
              {usuarios.length === 0 ? (
                <p className="text-sm text-app-muted">Nadie conectado aún</p>
              ) : (
                <ul className="space-y-2">
                  {usuarios.map((u) => (
                    <li
                      key={u.id || u.nombre}
                      className="text-sm text-app-text px-2 py-1.5 rounded-button bg-app-bg border border-app-border"
                    >
                      {u.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

export default Live;
