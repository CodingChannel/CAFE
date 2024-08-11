import React from "react";
import {act} from 'react';
import { render, screen, fireEvent } from "@testing-library/react";

import { useForm } from "react-hook-form";
import CafeTextField from "./CafeTextBox";

describe("CafeTextField Component", () => {
  const Wrapper = ({ errors }: { errors: any }) => {
    const { control, formState } = useForm({
      defaultValues: {
        name: "",
        description: "",
        location: "",
      },
    });
    return <CafeTextField name="name" control={control} rules={{ required: "Name is required" }} errors={errors || formState.errors} label="Name" placeholder="Enter your name" data-testid="cafe-textfield" />;
  };

  const mockErrors = {
    name: { message: "Name is required" },
  };

  it("renders without crashing", () => {
    render(<Wrapper errors={undefined} />);
    expect(screen.getByTestId("cafe-textfield")).toBeInTheDocument();
  });

  it("shows error message when validation fails", () => {
    render(<Wrapper errors={mockErrors} />);
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("renders input with correct label and placeholder", () => {
    render(<Wrapper errors={undefined} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("displays error message when there is an error", () => {
    render(<Wrapper errors={mockErrors} />);
    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("does not display error message when there are no errors", () => {
    render(<Wrapper errors={undefined} />);
    expect(screen.queryByText("Name is required")).toBeNull();
  });

  it("allows text input", () => {
    render(<Wrapper errors={undefined} />);
    const input = screen.getByPlaceholderText("Enter your name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "John Doe" } });
    expect(input.value).toBe("John Doe");
  });
});
