import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";

function Live() {
  const { socket, conectado } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const [nombre, setNombre] = useState(
    () => sessionStorage.getItem("nombreLive") || "",
  );
  const [borrador, setBorrador] = useState(user?.name || "");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    socket.on("usuarios:lista", setUsuarios);
    return () => socket.off("usuarios:lista", setUsuarios);
  }, [socket]);

  //   Cada vez que (re)conectemos, le diremos al servidor quienes somos
  useEffect(() => {
    if (nombre && conectado) {
      socket.emit("usuario:unirse", nombre);
      setNombre(nombre);
    }
  }, [nombre, conectado, socket]);

  function entrar(e) {
    e.preventDefault();
    if (borrador.trim() === "") return;
    sessionStorage.setItem("nombreLive", borrador.trim());
  }
}
