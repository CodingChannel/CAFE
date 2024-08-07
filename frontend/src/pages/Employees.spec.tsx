import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import Employees from "./Employees";
import rootReducer from "../store/reducers";

const mockStore = createStore(rootReducer);

describe("Employees Component", () => {
  it("renders Employees component and title", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Employees />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Employees")).toBeInTheDocument();
  });

  it("renders 'Add New Employee' button", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Employees />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Add New Employee")).toBeInTheDocument();
  });
});
