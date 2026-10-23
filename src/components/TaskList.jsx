import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PiPlusCircleLight,
  PiArrowClockwiseLight,
  PiTrashLight,
  PiEyeLight,
  PiCheckCircleLight,
  PiCircleLight,
  PiSpinnerLight,
} from "react-icons/pi";
import Card from "./Card";
import { tareasService } from "../services/tareasService";
import Badge from "./Badge";
import {
  Button,
  SuccessButton,
  ErrorButton,
  WarningButton,
  NeutralButton,
} from "./buttons/Buttons";
import Input from "./inputs/Input";
import SearchInput from "./inputs/SearchInput";

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

  async function cargarTareas() {
    try {
      setLoading(true);
      setError(null);

      const response = await tareasService.getTareas(user.id);
      if (!response.ok) {
        throw new Error(`Error al cargar las tareas: ${response.status}`);
      }
      setTareas(response);
    } catch (e) {
      setError(`Error al cargar las tareas: ${e.message}`);
      console.error("error", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const guardadas = localStorage.getItem("tareas");
    if (guardadas) {
      setTimeout(() => {
        setTareas(JSON.parse(guardadas));
        setLoading(false);
      }, 5000);
    } else {
      setTimeout(() => {
        cargarTareas();
      }, 5000);
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
  // Función para intentar nuevamente desde la API
  async function tryAgainFromApi() {
    await cargarTareas();
  }
  // Función para eliminar todas las tareas
  function eliminarTodas() {
    if (confirm("¿Eliminar todas las tareas?")) {
      setTareas([]);
      localStorage.removeItem("tareas");
    }
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
    <Card className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-app-text">
        Mis Tareas
      </h1>
      <div className="mb-4">
        <SearchInput
          placeholder={"Buscar Tarea..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading && (
        <p className="text-center text-app-muted py-4 flex">
          <PiSpinnerLight className="animate-spin text-center text-3xl mx-auto" />
        </p>
      )}
      {error && (
        <div className="bg-red-200 dark:bg-red-700 p-4 rounded-input text-center text-app-text">
          <p className="text-lg font-bold">ERROR: Surgio algo inesperado</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={agregarTarea} className="flex items-center gap-2 my-4">
        {/* <input
          name="nuevaTarea"
          type="text"
          value={nuevaTarea}
          className="w-auto rounded-input p-4  bg-white border border-b-gray-200"
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
        /> */}
        <Input
          type="text"
          placeholder="Nueva tarea..."
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          disabled={loading}
          className="flex-1"
        />
        <Button type="submit" disabled={loading} icon={PiPlusCircleLight} />
      </form>
      <div className="flex flex-wrap gap-2 mb-4">
        <NeutralButton
          onClick={tryAgainFromApi}
          disabled={loading}
          icon={PiArrowClockwiseLight}
        ></NeutralButton>
        <ErrorButton onClick={eliminarTodas} icon={PiTrashLight}>
          Eliminar todas
        </ErrorButton>
      </div>
      <ul className="space-y-2">
        {filteredTareas.length === 0 && !loading ? (
          <p>No hay tareas. ¡Agrega una!</p>
        ) : (
          filteredTareas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex items-center gap-3 p-3 bg-app-bg rounded-card border border-app-border transition-colors duration-200"
            >
              <button
                onClick={() => toggleCompletada(tarea.id)}
                className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                aria-label={
                  tarea.completed
                    ? "Marcar como pendiente"
                    : "Marcar como completada"
                }
              >
                {tarea.completed ? (
                  <PiCheckCircleLight className="text-green-500" />
                ) : (
                  <PiCircleLight className="text-app-muted" />
                )}
              </button>
              <span
                className={`flex-1 text-app-text ${tarea.completed ? "line-through text-app-muted" : ""}`}
              >
                {tarea.title}
              </span>
              <div className="flex gap-2">
                <Link
                  to={`/task/${tarea.id}`}
                  className="bg-purple-accent hover:bg-purple-600 text-white px-3 py-1 rounded-button text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  <PiEyeLight className="text-xs" /> Ver
                </Link>
                <button
                  onClick={() => eliminarTarea(tarea.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-button text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  <PiTrashLight className="text-xs" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <p>Total: {filteredTareas.length} tareas</p>
    </Card>
  );
}

export default TaskList;
