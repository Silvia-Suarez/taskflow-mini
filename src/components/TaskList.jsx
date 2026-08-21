import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PiPlusCircleLight } from "react-icons/pi";
import SearchInput from "./inputs/SearchInput";
import { NeutraButton } from "./Buttons";
function TaskList() {
  // Estado: lista de tareas
  const [tareas, setTareas] = useState([]);
  // Estado: valor del input
  const [nuevaTarea, setNuevaTarea] = useState("");
  // Manejo de estados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // HAGAMOS EL EJEMPLO DE BUSCAR TAREAS CON UN SEARCH BAR
  const [search, setSearch] = useState("");
  const filteredTareas = tareas
    .filter((tarea) => tarea.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.id - a.id) // Ordenar por id de manera descendente
    .sort((a, b) => a.completed - b.completed); // Ordenar por completed de manera ascendente

  useEffect(() => {
    async function cargarTareas() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos",
        );
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setTareas(data);
      } catch (e) {
        setError(e.message);
        console.error("error", e);
      } finally {
        setLoading(false);
      }
    }

    const guardadas = localStorage.getItem("tareas");
    if (guardadas) {
      setTareas(JSON.parse(guardadas));
      setLoading(false);
    } else {
      cargarTareas();
    }
  }, []);

  useEffect(() => {
    if (tareas.length > 0) {
      localStorage.setItem("tareas", JSON.stringify(tareas));
    }
  }, [tareas]);

  // Función para agregar tarea
  function agregarTarea(e) {
    e.preventDefault();
    if (nuevaTarea.trim() === "") return;

    const nueva = {
      id: Date.now(),
      title: nuevaTarea,
      completed: false,
    };

    setTareas([...tareas, nueva]);
    setNuevaTarea("");
  }

  // Función para eliminar tarea
  function eliminarTarea(id) {
    setTareas(tareas.filter((t) => t.id !== id));
  }

  // Función para alternar completada
  function toggleCompletada(id) {
    setTareas(
      tareas.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  return (
    <div className=" m-2 max-w-1/2 mx-auto flex flex-col gap-4 bg-background-primary-color-100 dark:bg-background-primary-color-900 p-4 rounded-input dark:text-white">
      <h1>Mis Tareas</h1>
      <SearchInput placeholder={"Buscar Tarea..."} value={search} onChange={(e) =>setSearch(e.target.value)}/>
      {loading && <p className="loading-text">Cargando tareas...</p>}
      {error && (
        <p>
          ERROR: Surgio algo inesperado
          <br /> <span style={{ color: "red" }}></span>
          {error}
        </p>
      )}

      <form onSubmit={agregarTarea}>
        <input
          name="nuevaTarea"
          type="text"
          value={nuevaTarea}
          className="w-auto rounded-input p-4  bg-white border border-b-gray-200"
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button className="main-button" type="submit">
          <PiPlusCircleLight className="dark:text-white text-background-primary-color-600  text-2xl" />
        </button>
      </form>

      <ul>
        {filteredTareas.length === 0 && !loading ? (
          <p>No hay tareas. ¡Agrega una!</p>
        ) : (
          filteredTareas.map((tarea) => (
            <li key={tarea.id}>
              <input
                type="checkbox"
                checked={tarea.completed}
                onChange={() => toggleCompletada(tarea.id)}
              />
              <Link to={`/task/${tarea.id}`}>{tarea.title}</Link>
              <button
                className="delete-button"
                onClick={() => eliminarTarea(tarea.id)}
              >
                Eliminar
              </button>
            </li>
          ))
        )}
      </ul>

      <p>Total: {filteredTareas.length} tareas</p>
    </div>
  );
}

export default TaskList;
