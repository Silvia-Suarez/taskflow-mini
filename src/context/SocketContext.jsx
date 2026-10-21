import { createContext, useEffect, useState } from "react";
import { socket } from "../socket";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [conectado, setConectado] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setConectado(true);
    }
    function onDisconnect() {
      setConectado(false);
    }

    // Socket.IO built-in events (not custom "connected"/"disconnected")
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.connect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, conectado }}>
      {children}
    </SocketContext.Provider>
  );
}
