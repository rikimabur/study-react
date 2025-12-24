import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import PublicRoute from ".././publicRoute";
import { mockStore } from "../../utils/mockStore";
import type { Role } from "../../models/rootModel";

describe("PublicRoute", () => {
  test("renders public content when NOT logged in", () => {
    const store = mockStore({
      auth: { authData: undefined, token: undefined, isAuthenticated: false },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<div>Login Page</div>} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("redirects to home when logged in", () => {
    const store = mockStore({
      auth: {
        authData: {
          accessToken: "fake-token",
          refreshToken: "fake-token",
          user: {
            id: 1,
            firstName: "test",
            lastName: "test",
            username: "test",
            role: Role.CUSTOMER,
            email: "test@gmail.com",
            gender: undefined,
            image: undefined,
          },
        },
        token: "fake-token",
        isAuthenticated: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<div>Login Page</div>} />
            </Route>

            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
  });
});
