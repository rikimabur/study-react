import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import test, { beforeEach, describe } from "node:test";
import PrivateRoute from "../privateRoute";
import { Role } from "../../models/rootModel";

const TestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="layout">{children}</div>
);

describe("PrivateRoute", () => {
  beforeEach(() => localStorage.clear());

  test("redirects to login when not logged in", () => {
    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route
            path="/cart"
            element={
              <PrivateRoute allowedRoles={[Role.CUSTOMER]}>
                <div>Cart</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders when role allowed", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ token: "abc", role: "customer" })
    );

    render(
      <MemoryRouter initialEntries={["/cart"]}>
        <Routes>
          <Route
            path="/cart"
            element={
              <PrivateRoute allowedRoles={["customer"]}>
                <div>Cart Page</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Cart Page")).toBeInTheDocument();
  });

  test("redirects when role NOT allowed", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ token: "token", role: "user" })
    );

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <div>Admin</div>
              </PrivateRoute>
            }
          />
          <Route path="/unauthorized" element={<div>Not Allowed</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Not Allowed")).toBeInTheDocument();
  });

  test("renders with layout", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ token: "token", role: "admin" })
    );

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={[Role.ADMIN]}>
                <TestLayout>
                  <div>Admin Content</div>
                </TestLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Admin Content")).toBeInTheDocument();
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });
});
