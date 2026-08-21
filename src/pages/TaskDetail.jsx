import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { PiArrowLeftLight } from "react-icons/pi";

function TaskDetail() {
  const { id } = useParams();
  const [tarea, setTarea] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarTarea() {
      try {
        setCargando(true);
        setError(null);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
        );
        if (!response.ok) throw new Error("Tarea no encontrada");
        const data = await response.json();
        setTarea(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }
    cargarTarea();
  }, [id]);

  return (
    <div className="min-h-screen bg-app-bg transition-colors duration-300">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-app-text mb-6">
          Detalle de la tarea
        </h1>
        <Card className="p-6 max-w-lg">
          {cargando && <p className="text-app-muted">Cargando tarea...</p>}
          {error && (
            <>
              <p className="text-red-300 dark:text-red-700 my-5">Error: {error}</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-purple-accent hover:underline font-semibold"
              >
                <PiArrowLeftLight /> Volver a la lista
              </Link>
            </>
          )}
          {tarea && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-app-text">
                {tarea.title}
              </h2>
              <div className="space-y-2 text-app-muted">
                <p>
                  <span className="font-semibold text-app-text">ID:</span>{" "}
                  {tarea.id}
                </p>
                <p>
                  <span className="font-semibold text-app-text">Estado:</span>{" "}
                  <Badge variant={tarea.completed ? "green" : "gray"}>
                    {tarea.completed ? "Completada" : "Pendiente"}
                  </Badge>
                </p>
                <p>
                  <span className="font-semibold text-app-text">Usuario:</span>{" "}
                  {tarea.userId}
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-purple-accent hover:underline font-semibold"
              >
                <PiArrowLeftLight /> Volver a la lista
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default TaskDetail;
