import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import RoutesComponent from "./RoutesComponent";
import { store } from "../store";

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/*" element={ui} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("RoutesComponent", () => {
  it("renders Cafes component on root and /cafes path", () => {
    renderWithRouter(<RoutesComponent />, { route: "/" });
    expect(screen.getByTestId("page-cafes")).toBeInTheDocument();
    expect(screen.getByTestId("button-add-new-cafe")).toBeInTheDocument();
 
  });

  it("renders AddEditCafe component for /cafes/add and /cafes/:id paths", () => {
    renderWithRouter(<RoutesComponent />, { route: "/cafes/add" });
    expect(screen.getByText(/Add New Cafe/i)).toBeInTheDocument();

    renderWithRouter(<RoutesComponent />, { route: "/cafes/123" });
    expect(screen.getByText(/Edit Cafe/i)).toBeInTheDocument();
  });

  it("renders Employees component on /employees path", () => {
    renderWithRouter(<RoutesComponent />, { route: "/employees" });
    expect(screen.getByText(/Employees/i)).toBeInTheDocument();
  });

  it("renders AddEditEmployee component for /employees/add and /employees/:id paths", () => {
    renderWithRouter(<RoutesComponent />, { route: "/employees/add" });
    expect(screen.getByText(/Add New Employee/i)).toBeInTheDocument();

    renderWithRouter(<RoutesComponent />, { route: "/employees/456" });
    expect(screen.getByText(/Edit Employee/i)).toBeInTheDocument();
  });

  it("redirects to / for unknown paths", () => {
    renderWithRouter(<RoutesComponent />, { route: "/unknown" });
    expect(screen.getByText(/Cafes/i)).toBeInTheDocument();
  });
});
