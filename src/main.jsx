import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/index.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

/* 
1. Crear el contexto para el tema
const ThemeContext = createContext();

2. Proveer el valor del tema al contexto
<ThemeContext.Provider value="dark">
  <App/>
</ThemeContext.Provider>

3. Consumir el valor del tema
const theme = useContext(ThemeContext);

Context = es un objeto que se encarga de proveer un valor a sus hijos.
Estado global sin prop drilling.
*/

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
