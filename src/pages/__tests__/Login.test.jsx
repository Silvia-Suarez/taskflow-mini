import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import { ThemeProvider } from "../../context/ThemeContext.jsx";
import authReducer from "../../store/slices/authSlice";
import Login from "../Login.jsx";
import { authService } from "../../services/authService";

vi.mock("../../services/authService", () => ({
  authService: {
    login: vi.fn(),
  },
}));

function renderLogin() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider>
          <Login />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("envía el formulario con email y pass", async () => {
    authService.login.mockResolvedValue({
      usuario: { email: "test@correo.com" },
      token: "abc123",
    });
    const user = userEvent.setup();

    renderLogin();

    await user.type(
      screen.getByPlaceholderText("ejemplo@correo.com"),
      "test@correo.com",
    );
    await user.type(screen.getByPlaceholderText("*********"), "password123");
    await user.click(screen.getByRole("button", { name: "Iniciar" }));

    expect(authService.login).toHaveBeenCalledWith({
      email: "test@correo.com",
      password: "password123",
    });
  });

  it("envía el formulario con con los campos vacíos", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.click(screen.getByRole("button", { name: "Iniciar" }));

    expect(
      await screen.findByText("Por favor, complete los campos obligatorios"),
    ).toBeInTheDocument();
    expect(authService.login).not.toHaveBeenCalled();
  });
});
