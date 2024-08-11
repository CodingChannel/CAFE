import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchableDropdown from "./SearchableDropdown";

describe("SearchableDropdown Component", () => {
  it("renders without crashing", () => {
    const items = ["Item 1", "Item 2", "Item 3"];
    const selectedItem = null;
    const setSelectedItem = jest.fn();

    render(<SearchableDropdown items={items} placeholderItemText={"Search Item"} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />);
  });

  it("sets selected item on change", async () => {
    const items = ["Item 1", "Item 2", "Item 3"];
    const selectedItem = null;
    const setSelectedItem = jest.fn();

    const { getByLabelText, getByText } = render(<SearchableDropdown items={items} placeholderItemText={"Search Item"} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />);

    const input = getByLabelText("Search Item");
    fireEvent.change(input, { target: { value: "Item 1" } });
    const option = getByText("Item 1");
    fireEvent.click(option);
    await waitFor(() => expect(setSelectedItem).toHaveBeenCalledTimes(1));
  });
});
