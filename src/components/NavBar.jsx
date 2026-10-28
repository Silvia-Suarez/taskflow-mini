import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonTheme from "../components/buttons/ButtonTheme";
import {
  PiHouse,
  PiInfo,
  PiEnvelope,
  PiSignIn,
  PiSignOut,
  PiUserCircleGearThin,
  PiBroadcast,
} from "react-icons/pi";
import {
  logout,
  selectIsAuthenticated,
} from "../store/slices/authSlice";

function Navegacion() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const links = [
    { to: "/", label: "Inicio", icon: <PiHouse className="text-xl" /> },
    {
      to: "/live",
      label: "Live",
      icon: <PiBroadcast className="text-xl" />,
    },
    { to: "/about", label: "Nosotros", icon: <PiInfo className="text-xl" /> },
    {
      to: "/contact",
      label: "Contacto",
      icon: <PiEnvelope className="text-xl" />,
    },
    {
      to: "/profile",
      label: "Perfil",
      icon: <PiUserCircleGearThin className="text-xl" />,
    },
  ];

  const renderLinks = links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      className={({ isActive }) =>
        `font-semibold px-3 py-2 text-blue-accent rounded-button transition-colors duration-200 flex items-center gap-2
        ${isActive ? "bg-white/50 " : "hover:bg-white/20"}`
      }
    >
      {link.icon} {link.label}
    </NavLink>
  ));

  function handleLogout() {
    if (window.confirm("¿Estás seguro de querer cerrar sesión?")) {
      dispatch(logout());
      navigate("/login");
    }
  }
  return (
    <nav
      className={`bg-pink-soft px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-card transition-colors duration-300`}
    >
      <p className="text-6xl text-center text-pink-accent text-backgroung-primary-color font-extrabold w-full">
        TASK FLOW
      </p>

      <div className="mx-auto text-center flex items-center gap-1 flex-wrap">
        {renderLinks}
      </div>
      {isAuthenticated ? (
        <button className="cursor-pointer" onClick={handleLogout}>
          <PiSignOut className="text-3xl text-red-500"></PiSignOut>
        </button>
      ) : (
        <NavLink to="/login">
          <PiSignIn className="text-3xl text-blue-accent"></PiSignIn>
        </NavLink>
      )}
      <ButtonTheme />
    </nav>
  );
}

export default Navegacion;
