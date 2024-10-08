import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";
import Cafes from "./Cafes";
import rootReducer from "../store/reducers";

const mockStore = createStore(rootReducer);

describe("Cafes Component", () => {
  it("renders Cafes component and title", () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Cafes />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Cafes")).toBeInTheDocument();
    expect(screen.getByTestId("page-cafes")).toBeInTheDocument();
    expect(screen.getByTestId("button-add-new-cafe")).toBeInTheDocument();
  });
 
});
