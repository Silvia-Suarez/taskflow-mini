import TaskList from "./components/TaskList";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TaskDetail from "./pages/TaskDetail";
import { ThemeContext } from "./context/ThemeContext.jsx";
import { useContext } from "react";
/* Existen 2 tipos de aplicativos web
1. los spa : Single paage application.  **ESTE ES EL QUE USAMOS**
Que una sola pagina reneriza diversos componentes, sin recargas.
2. los mpa: Multi page application. Que cada pagina es una pagina independiente. */

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`app-${theme}`}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/task/:id" element={<TaskDetail />}></Route>
      </Routes>
    </div>
  );
}

export default App;
