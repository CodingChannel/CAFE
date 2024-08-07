import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";

it("renders NavBar component with correct elements", () => {
  const screen = render(
    <Router>
      <NavBar />
    </Router>
  );

  // Check if the title is present
  expect(screen.getByText("Cafe Employee Manager")).toBeInTheDocument();

  // Check if the "Cafes" and "Employees" links are present
  expect(screen.getByRole("link", { name: /Cafes/i })).toHaveAttribute("href", "/cafes");
  expect(screen.getByRole("link", { name: /Employees/i })).toHaveAttribute("href", "/employees");
});
