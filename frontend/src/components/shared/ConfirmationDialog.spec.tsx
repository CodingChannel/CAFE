import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ConfirmationDialog from "./ConfirmationDialog";

describe("ConfirmationDialog", () => {
  const defaultProps = {
    open: true,
    title: "Confirm Action",
    description: "Are you sure you want to proceed?",
    onClose: jest.fn(),
    onConfirm: jest.fn(),
  };

  it("renders correctly when open is true", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to proceed?")).toBeInTheDocument();
    expect(screen.getByText("Disagree")).toBeInTheDocument();
    expect(screen.getByText("Agree")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(<ConfirmationDialog {...defaultProps} open={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when Disagree button is clicked", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText("Disagree"));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onConfirm when Agree button is clicked", () => {
    render(<ConfirmationDialog {...defaultProps} />);
    fireEvent.click(screen.getByText("Agree"));
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });
});
