import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Button } from "../buttons/Buttons";
import Input from "../inputs/Input";

/**
 * Socket contract (backend should match):
 * Client → server:
 *   chat:mensaje(texto: string)
 *   chat:escribiendo(escribiendo: boolean)
 * Server → client:
 *   chat:mensaje({ id, autor, texto, fecha, sistema?, autorId? })
 *   chat:escribiendo({ id, nombre, escribiendo })
 */
function LiveChat() {
  const { socket, conectado } = useContext(SocketContext);
  const [mensajes, setMensajes] = useState([]);
  const [text, setText] = useState("");
  const [escribiendo, setEscribiendo] = useState({});
  const timeoutRef = useRef(null);
  const finRef = useRef(null);

  useEffect(() => {
    function onMensaje(mensaje) {
      setMensajes((prev) => [...prev, mensaje]);
    }

    function onEscribiendo({ id, nombre, escribiendo: isTyping }) {
      setEscribiendo((prev) => {
        const copia = { ...prev };
        if (isTyping) copia[id] = nombre;
        else delete copia[id];
        return copia;
      });
    }

    socket.on("chat:mensaje", onMensaje);
    socket.on("chat:escribiendo", onEscribiendo);
    return () => {
      socket.off("chat:mensaje", onMensaje);
      socket.off("chat:escribiendo", onEscribiendo);
    };
  }, [socket]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  function handleChange(e) {
    setText(e.target.value);
    if (!conectado) return;
    socket.emit("chat:escribiendo", true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      socket.emit("chat:escribiendo", false);
    }, 1000);
  }

  function enviar(e) {
    e.preventDefault();
    if (text.trim() === "" || !conectado) return;
    socket.emit("chat:mensaje", text.trim());
    socket.emit("chat:escribiendo", false);
    clearTimeout(timeoutRef.current);
    setText("");
  }

  const nombresEscribiendo = Object.values(escribiendo);

  return (
    <div className="flex flex-col h-105">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-app-text">Live Chat</h2>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-button ${
            conectado
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {conectado ? "Conectado" : "Desconectado"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 border border-app-border rounded-card p-3 bg-app-bg mb-3">
        {mensajes.length === 0 && (
          <p className="text-sm text-app-muted text-center py-8">
            Aún no hay mensajes. ¡Saluda al grupo!
          </p>
        )}
        {mensajes.map((m) => (
          <div
            key={m.id}
            className={`text-sm rounded-button px-3 py-2 ${
              m.sistema
                ? "text-center text-app-muted italic bg-transparent"
                : "bg-app-surface border border-app-border text-app-text"
            }`}
          >
            {!m.sistema && (
              <p className="font-semibold text-purple-accent text-xs mb-0.5">
                {m.autor}
              </p>
            )}
            <p>{m.texto}</p>
          </div>
        ))}
        <div ref={finRef} />
      </div>

      {nombresEscribiendo.length > 0 && (
        <p className="text-xs text-app-muted mb-2">
          {nombresEscribiendo.join(", ")}{" "}
          {nombresEscribiendo.length === 1 ? "está" : "están"} escribiendo…
        </p>
      )}

      <form onSubmit={enviar} className="flex gap-2 items-center">
        <Input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Escribe un mensaje..."
          disabled={!conectado}
          className="flex-1"
        />
        <Button type="submit" disabled={!conectado || text.trim() === ""}>
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default LiveChat;
