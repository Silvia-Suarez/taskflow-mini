import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

function ButtonTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "🌞"}</button>
  );
}
export default ButtonTheme;
