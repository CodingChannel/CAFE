import React from "react";
import { render, screen, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchableDropdown from "./SearchableDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, setSelectedCafeLocation } from "../../store/actions/CafeAction";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
describe("SearchableDropdown", () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockSelector.mockReturnValue({
      cafeReducer: {
        locations: ["Location 1", "Location 2"],
        selectedLocation: null,
      },
    });
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation(mockSelector);
  });

  it.skip("fetches locations on mount", () => {
    render(<SearchableDropdown />);
    expect(mockDispatch).toHaveBeenCalledWith(fetchLocations());
  });

  it.skip("updates selected location in state when a location is selected", async () => {
    const { getByRole } = render(<SearchableDropdown />);
    const dropdown = getByRole("combobox");

    userEvent.click(dropdown);
    const option = screen.getByText("Location 1");
    userEvent.click(option);

    expect(mockDispatch).toHaveBeenCalledWith(setSelectedCafeLocation("Location 1"));
  });
});
