import { useContext } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Badge from "../components/Badge";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user, isAdmin } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-app-bg transition-colors duration-300">
      <NavBar />
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold text-app-text mb-6">Perfil</h1>
        <Card className="p-6 space-y-3">
          <p className="text-app-text">
            <span className="font-semibold">Nombre:</span>{" "}
            {user?.nombre || user?.name}
          </p>
          <p className="text-app-text">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-app-text flex items-center gap-2">
            <span className="font-semibold">Rol:</span>
            <Badge variant={isAdmin ? "purple" : "gray"}>
              {user?.role || "user"}
            </Badge>
          </p>
        </Card>
      </main>
    </div>
  );
}

export default Profile;
