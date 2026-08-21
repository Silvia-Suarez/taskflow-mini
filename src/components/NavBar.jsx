import { NavLink } from "react-router-dom";
import ButtonTheme from "../components/buttons/ButtonTheme";
import { PiHouse, PiInfo, PiEnvelope } from "react-icons/pi";

function Navegacion() {
  const links = [
    { to: "/", label: "Inicio", icon: <PiHouse className="text-xl" /> },
    { to: "/about", label: "Nosotros", icon: <PiInfo className="text-xl" /> },
    {
      to: "/contact",
      label: "Contacto",
      icon: <PiEnvelope className="text-xl" />,
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
  return (
    <nav
      className={`bg-pink-soft px-6 py-4 flex flex-wrap items-center justify-between gap-4 shadow-card transition-colors duration-300`}
    >
      <p className="text-6xl text-center text-pink-accent text-backgroung-primary-color font-extrabold w-full">
        TASK FLOW
      </p>

      <div className="mx-auto text-center flex items-center gap-1 flex-wrap">{renderLinks}</div>
      <ButtonTheme />
    </nav>
  );
}

export default Navegacion;
