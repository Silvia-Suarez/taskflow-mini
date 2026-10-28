import { render, screen } from "@testing-library/react";
import Badge from "../Badge";

describe("Badge", () => {
  it("muestra el texto que recibe", () => {
    render(<Badge>Total: 5</Badge>);
    expect(screen.getByText("Total: 5")).toBeInTheDocument();
  });

  it("aplica la variante purple por defecto", () => {
    render(<Badge>Test purple</Badge>);
    const badge = screen.getByText("Test purple");
    expect(badge).toHaveClass("bg-purple-soft");
  });

  it("aplica la variante indicada", () => {
    render(<Badge variant="gray">Test variant</Badge>);
    const badge = screen.getByText("Test variant");
    expect(badge).toHaveClass("bg-app-border");
  });
});
