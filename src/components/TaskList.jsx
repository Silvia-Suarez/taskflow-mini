import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Button, ErrorButton, NeutralButton } from "./buttons/Buttons";
import Input from "./inputs/Input";
import SearchInput from "./inputs/SearchInput";
import {
  cargarTareas,
  crearTarea,
  eliminarTarea,
  eliminarTodas,
  selectTareas,
  selectTareasError,
  selectTareasLoading,
  toggleCompletada,
} from "../store/slices/tareasSlice";

function taskId(tarea) {
  return tarea._id || tarea.id;
}

function taskTitle(tarea) {
  return tarea.title || tarea.text || "";
}

function TaskList() {
  const tareas = useSelector(selectTareas);
  const loading = useSelector(selectTareasLoading);
  const error = useSelector(selectTareasError);
  const dispatch = useDispatch();

  const [nuevaTarea, setNuevaTarea] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(cargarTareas());
  }, [dispatch]);

  const filteredTareas = tareas
    .filter((tarea) =>
      taskTitle(tarea).toLowerCase().includes(search.toLowerCase()),
    )
    .slice()
    .sort((a, b) => Number(a.completed) - Number(b.completed));

  function handleAgregarTarea(e) {
    e.preventDefault();
    if (nuevaTarea.trim() === "") return;
    dispatch(crearTarea(nuevaTarea.trim()));
    setNuevaTarea("");
  }

  function tryAgainFromApi() {
    dispatch(cargarTareas());
  }

  function handleEliminarTodas() {
    if (confirm("¿Eliminar todas las tareas?")) {
      dispatch(eliminarTodas());
    }
  }

  function handleEliminarTarea(id) {
    dispatch(eliminarTarea(id));
  }

  function handleToggleCompletada(tarea) {
    dispatch(
      toggleCompletada({
        id: taskId(tarea),
        completed: !!tarea.completed,
      }),
    );
  }

  return (
    <Card className="max-w-2xl mx-auto p-6">
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

      <form
        onSubmit={handleAgregarTarea}
        className="flex items-center gap-2 my-4"
      >
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
        <ErrorButton onClick={handleEliminarTodas} icon={PiTrashLight}>
          Eliminar todas
        </ErrorButton>
      </div>
      <ul className="space-y-2">
        {filteredTareas.length === 0 && !loading ? (
          <p>No hay tareas. ¡Agrega una!</p>
        ) : (
          filteredTareas.map((tarea) => (
            <li
              key={taskId(tarea)}
              className="flex items-center gap-3 p-3 bg-app-bg rounded-card border border-app-border transition-colors duration-200"
            >
              <button
                onClick={() => handleToggleCompletada(tarea)}
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
                {taskTitle(tarea)}
              </span>
              <div className="flex gap-2">
                <Link
                  to={`/task/${taskId(tarea)}`}
                  className="bg-purple-accent hover:bg-purple-600 text-white px-3 py-1 rounded-button text-sm transition-colors duration-200 flex items-center gap-1"
                >
                  <PiEyeLight className="text-xs" /> Ver
                </Link>
                <button
                  onClick={() => handleEliminarTarea(taskId(tarea))}
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
