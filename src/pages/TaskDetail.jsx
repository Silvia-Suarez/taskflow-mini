import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getTask() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();
        setTask(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    getTask();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!task) return <div>Task not found</div>;
  return (
    <>
      <div className="page">
        <h1> DETALLE DE LA TAREA</h1>
        <div>
          <h2>Contenido de la tarea: {task.title}</h2>
          <p> ID: {task.id}</p>
          <p> Completada: {task.completed ? "Si" : "No"}</p>
          <p> Usuario: {task.userId}</p>
          <Link to="/">Volver a la lista de tareas</Link>
        </div>
      </div>
    </>
  );
}
export default TaskDetail;
