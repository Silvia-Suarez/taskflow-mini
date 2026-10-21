import NavBar from '../components/NavBar';
import Card from '../components/Card';
import Badge from '../components/Badge';

function About() {
  return (
    <div className="min-h-screen bg-app-bg transition-colors duration-300">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-app-text mb-6">Sobre TaskFlow Mini</h1>
        <Card className="p-6">
          <p className="text-app-text mb-4">
            TaskFlow Mini es una aplicación de tareas construida con React, TailwindCSS y React Icons.
          </p>
          <p className="text-app-text mb-4">
            Esta aplicación sirve como guía para el proyecto del semestre.
          </p>
          <div className="mb-4">
            <p className="font-semibold text-app-text">Características:</p>
            <ul className="list-disc list-inside text-app-muted mt-2 space-y-1">
              <li>Autenticación simulada con Context API</li>
              <li>Tema oscuro/claro</li>
              <li>Consumo de API (JSONPlaceholder)</li>
              <li>Rutas protegidas (PrivateRoute)</li>
              <li>Chat en vivo con Socket.IO</li>
              <li>Persistencia con localStorage</li>
              <li>TailwindCSS + React Icons</li>
            </ul>
          </div>
          <Badge variant="purple">Versión 1.0.0</Badge>
        </Card>
      </div>
    </div>
  );
}

export default About;