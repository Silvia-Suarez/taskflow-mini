import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { PiArrowLeftLight } from "react-icons/pi";
import { selectTareaById } from "../store/slices/tareasSlice";
import { tareasService } from "../services/tareasService";

function TaskDetail() {
  const { id } = useParams();
  const tareaFromStore = useSelector(selectTareaById(id));
  const [tarea, setTarea] = useState(tareaFromStore || null);
  const [cargando, setCargando] = useState(!tareaFromStore);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (tareaFromStore) {
      setTarea(tareaFromStore);
      setCargando(false);
      setError(null);
      return;
    }

    let cancelled = false;

    async function cargarTarea() {
      try {
        setCargando(true);
        setError(null);
        const data = await tareasService.getTareaById(id);
        if (!cancelled) {
          setTarea(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.error ||
              err.response?.data?.mensaje ||
              err.message ||
              "Tarea no encontrada",
          );
        }
      } finally {
        if (!cancelled) {
          setCargando(false);
        }
      }
    }

    cargarTarea();
    return () => {
      cancelled = true;
    };
  }, [id, tareaFromStore]);

  const titulo = tarea?.title || tarea?.text;
  const tareaId = tarea?._id || tarea?.id;
  const userId = tarea?.userId || tarea?.usuario;

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
              <p className="text-red-300 dark:text-red-700 my-5">
                Error: {error}
              </p>
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
              <h2 className="text-2xl font-bold text-app-text">{titulo}</h2>
              <div className="space-y-2 text-app-muted">
                <p>
                  <span className="font-semibold text-app-text">ID:</span>{" "}
                  {tareaId}
                </p>
                <p>
                  <span className="font-semibold text-app-text">Estado:</span>{" "}
                  <Badge variant={tarea.completed ? "green" : "gray"}>
                    {tarea.completed ? "Completada" : "Pendiente"}
                  </Badge>
                </p>
                {userId != null && (
                  <p>
                    <span className="font-semibold text-app-text">
                      Usuario:
                    </span>{" "}
                    {String(userId)}
                  </p>
                )}
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
