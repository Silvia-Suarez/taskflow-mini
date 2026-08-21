import TaskList from "../components/TaskList.jsx";
import NavBar from "../components/NavBar.jsx";
function Home() {
  return (
    <div className="min-h-screen bg-app-bg transition-colors duration-300">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <TaskList />
      </main>
    </div>
  );
}
export default Home;
