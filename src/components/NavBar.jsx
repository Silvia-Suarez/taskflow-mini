import { NavLink } from "react-router-dom";
import "./NavBar.css";
function NavBar() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
          Contact
        </NavLink>
      </nav>
    </>
  );
}
export default NavBar;
