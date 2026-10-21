import { useState } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Input from "../components/inputs/Input";
import { Button } from "../components/buttons/Buttons";

function Contact() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim()) return;
    setEnviado(true);
    setNombre("");
    setEmail("");
    setMensaje("");
  }

  return (
    <div className="min-h-screen bg-app-bg transition-colors duration-300">
      <NavBar />
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold text-app-text mb-6">Contacto</h1>
        <Card className="p-6">
          {enviado && (
            <p className="mb-4 text-sm text-green-600 dark:text-green-300">
              Mensaje registrado (demo local, sin backend de contacto).
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              label="Nombre"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
            <div>
              <label className="block text-sm font-semibold text-app-text mb-1.5">
                Mensaje
              </label>
              <textarea
                placeholder="Mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={4}
                className="w-full px-4 py-2.5 rounded-button border border-app-border bg-app-surface text-app-text placeholder:text-app-muted focus:outline-none focus:ring-2 focus:ring-purple-accent/50"
              />
            </div>
            <Button type="submit">Enviar</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}

export default Contact;
