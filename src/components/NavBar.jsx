import { NavLink } from "react-router-dom";
import ButtonTheme from "./ButtonTheme";
import "./NavBar.css";
function NavBar() {
  const activeStyle =
    "text-background-primary-color-600 py-2 px-6 rounded-button bg-red-300";
  const inactiveStyle =
    "text-background-primary-color-400 py-2 px-6 rounded-button bg-red-50";
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];
  return (
    <>
      <nav className="flex flex-col items-center justify-center gap-8 p-4 text 2xl bg-background-primary-color-100">
        <ButtonTheme />
        <p className="text-6xl text-center text-backgroung-primary-color font-extrabold w-full">
          TASK FLOW MANAGER
        </p>
        <div className="flex items-center justify-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? activeStyle : inactiveStyle
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
export default NavBar;
