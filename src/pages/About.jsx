import NavBar from "../components/NavBar.jsx";
function About() {
  return (
    <>
    <NavBar />
      <div className="page">
        <h1>About Task Flow mini📚</h1>
        <p>
          Task flow mini es una aplicacion de lista de tareas que te permite
          organizar tu trabajo.
        </p>
        <p>Esta aplicacion fue creada con React y Vite.</p>
        <p>Version: 1.0.0</p>
      </div>
    </>
  );
}
export default About;
