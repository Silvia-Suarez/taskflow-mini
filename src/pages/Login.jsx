import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../components/inputs/Input";
import PasswordInput from "../components/inputs/PasswordInput";
import { Button } from "../components/buttons/Buttons";
import NavBar from "../components/NavBar";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !pass) {
      setError("Por favor, complete los campos obligatorios");
      return;
    }
    try {
      login(email, pass);
      navigate(from, { replace: true });
    } catch (e) {
      setError("Ocurrio un error inesperado al inciar sesión: ", e.message);
    } finally {
      setLoad(false);
    }
  }
  return (
    <>
      <NavBar />
      <div className="h-[calc(100vh-155px)] bg-app-bg flex items-center px-4">
        <div className="w-full max-w-md bg-app-surface rounded-card p-8 border border-app-border mx-auto">
          <h1 className="text-center text-3xl font-bold pb-8">LOGIN</h1>
          <p className="text-sm text-app-muted">
            Ingresa tus credenciales para poder continuar
          </p>

          {error && (
            <div className="bg-red-200 my-2 px-2 py-4 dark:bg-red-700 text-app-bg  rounded-button">
              <p>{error}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="border border-app-border rounded-card p-8 my-4 flex flex-col gap-4"
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              placeholder="ejemplo@correo.com"
            />
            <PasswordInput
              pass={pass}
              onChangePass={(e) => setPass(e.target.value)}
              error={error}
            />
            <Button type="submit">{load ? "...Loading" : "Iniciar"}</Button>
          </form>

          <p className="text-app-muted text-sm text-center">
            Cualquier email funciona si contiene "admin"✨
          </p>
        </div>
      </div>
    </>
  );
}
export default Login;
