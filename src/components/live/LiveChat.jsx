import { useEffect } from "react";

const { socket, conectado } = useContext(SocketContext);
const [mensaje, setMensaje] = useState("");
const [text, setText] = useState("");
const [escribiendo, setEscribiendo] = useState("");
const timeoutRef = useRef(null);
const finRef = useRef(null);

useEffect(() => {
  function onMensaje(mensaje) {
    setMensaje(
      (
        prev, // prev es el estado actual
      ) => [...prev, mensaje],
    ); // Mantiene el estado actual y agrega el nuevo mensaje
  }
  function onEscribiendo({ id, nombre, escribiendo }) {
    setEscribiendo((prev) => {
      const copia = { ...prev };
      if (escribiendo) copia[id] = nombre;
      else copia[id];
      return copia;
    }); // Mantiene el estado actual y actualiza el nombre del usuario que está escribiendo
  }
  socket.on("chat:mensaje", onMensaje);
  socket.on("chat:escribiendo", onEscribiendo);
  return () => {
    socket.off("chat:mensaje", onMensaje);
    socket.off("chat:escribiendo", onEscribiendo);
  };
}, [socket]);

useEffect(() => {
  // finRef.current es el tiempo en el que se termina de escribir
  finRef.current?.scrollIntoView({ behavior: "smooth" });
}, [mensaje]);

function handleChange(e) {
  setText(e.target.value);
  socket.emit("chat:escribiendo", true);
  clearTimeout(timeoutRef.current);
  timeoutRef.current = setTimeout(() => {
    socket.emit("chat:escribiendo", false);
  }, 1000); // 1 segundo de espera para que el servidor sepa que el usuario ya no está escribiendo
}

function enviar(e) {
  e.preventDefault();
  if (text.trim() === "") return;
  socket.emit("chat:mensaje", text);
  socket.emit("chat:escribiendo", false);
  clearTimeout(timeoutRef.current);
  setText("");
}

return (
    <div className="live-chat">
        <div className="live-chat-header">
            <h2>Live Chat</h2>
        </div>
    </div>
)