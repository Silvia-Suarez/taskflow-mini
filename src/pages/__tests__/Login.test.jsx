import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { ThemeProvider } from "../../context/ThemeContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import Login from "../Login.jsx";

function renderLogin({ login = vi.fn() } = {}) {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <AuthContext.Provider
          value={{
            user: null,
            login,
            logout: vi.fn(),
            isAuthenticated: false,
            loading: false,
            isAdmin: false,
          }}
        >
          <Login />
        </AuthContext.Provider>
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe("Login", () => {
  it("envía el formulario con email y pass", async () => {
    const login = vi.fn().mockResolvedValue({ email: "test@correo.com" });
    const user = userEvent.setup();

    renderLogin({ login });

    await user.type(
      screen.getByPlaceholderText("ejemplo@correo.com"),
      "test@correo.com",
    );
    await user.type(screen.getByPlaceholderText("*********"), "password123");
    await user.click(screen.getByRole("button", { name: "Iniciar" }));

    expect(login).toHaveBeenCalledWith("test@correo.com", "password123");
  });

  it("envía el formulario con con los campos vacíos", async () => {
    const login = vi.fn();
    const user = userEvent.setup();

    renderLogin({ login });

    await user.click(screen.getByRole("button", { name: "Iniciar" }));

    expect(
      await screen.findByText("Por favor, complete los campos obligatorios"),
    ).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });
});
