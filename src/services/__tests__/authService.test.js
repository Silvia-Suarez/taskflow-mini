import { authService } from "../authService";
import api from "../api";

vi.mock("../api", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("login envie las credenciales al backend", async () => {
    const resp = { usuario: { email: "test@correo.com" }, token: "abc123" };
    api.post.mockResolvedValue({ data: resp });

    const result = await authService.login({
      email: "test@correo.com",
      password: "password123",
    });

    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@correo.com",
      password: "password123",
    });
    expect(result).toEqual(resp)
  });
});
