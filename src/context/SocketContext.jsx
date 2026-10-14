import { createContext, useEffect, useState } from "react";
import { socket } from "../socket";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [conectado, setConectado] = useState(socket.connect);

  useEffect(() => {
    function onConnected() {
      setConectado(true);
    }
    function onDisconnected() {
      setConectado(false);
    }

    socket.on("connected", onConnected);
    socket.on("disconnected", onDisconnected);
    socket.connect();

    // Limpiar los listeners duplicados
    return () => {
      socket.off("connected", onConnected);
      socket.off("disconnected", onDisconnected);
      socket.disconnected();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, conectado }}>
      {children}
    </SocketContext.Provider>
  );
}
