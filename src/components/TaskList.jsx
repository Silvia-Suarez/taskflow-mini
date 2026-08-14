import { useState, useEffect } from "react";

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
  const filteredTareas = tareas.filter((tarea) =>
    tarea.title.toLowerCase().includes(search.toLowerCase()),
  );

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
      tareas.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  }

  return (
    <div className="task-list">
      <h1>Mis Tareas</h1>
      <input
        name="search"
        className="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar tarea..."
      />

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
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button className="main-button" type="submit">
          Agregar
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
              <span className={tarea.completed ? "completada" : ""}>
                {tarea.title}
              </span>
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
