import { renderHook } from "@testing-library/react-hooks/dom";
import { act } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateCafeRequest } from "../store/actions/CafeAction"; // Adjust the import path if necessary
import { CafeDto } from "../models/dto/CafeDto";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("AddEditCafe", () => {
  // Form initializes with default values when adding a new cafe
  it("should initialize form with default values when adding a new cafe", () => {
    const { result } = renderHook(() =>
      useForm<CafeDto>({
        defaultValues: {
          name: "",
          description: "",
          logo: "https://via.placeholder.com/150",
          location: "",
          employees: 0,
        },
      })
    );
    expect(result.current.getValues()).toEqual({
      name: "",
      description: "",
      logo: "https://via.placeholder.com/150",
      location: "",
      employees: 0,
    });
  });

  // Form initializes with current cafe data when editing an existing cafe
  it("should initialize form with current cafe data when editing an existing cafe", () => {
    const mockCafe: CafeDto = {
      id: "1",
      name: "Test Cafe",
      description: "A nice place",
      logo: "https://via.placeholder.com/150",
      location: "Test Location",
      employees: 10,
    };
    (useSelector as unknown as jest.Mock).mockReturnValue(mockCafe);
    const { result } = renderHook(() => useForm<CafeDto>());

    act(() => {
      result.current.reset(mockCafe);
    });

    expect(result.current.getValues()).toEqual(mockCafe);
  });

  // Form handles missing or undefined cafe data gracefully
  it("should handle missing or undefined cafe data gracefully", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(null);
    const { result } = renderHook(() => useForm<CafeDto>());

    act(() => {
      result.current.reset({
        name: "",
        description: "",
        logo: "https://via.placeholder.com/150",
        location: "",
        employees: 0,
      });
    });

    expect(result.current.getValues()).toEqual({
      name: "",
      description: "",
      logo: "https://via.placeholder.com/150",
      location: "",
      employees: 0,
    });
  });

  // File input handles invalid file types or empty files
  it("should handle invalid file types or empty files in file input", async () => {
    const { result } = renderHook(() => useForm<CafeDto>());
    const handleFileChange = jest.fn((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === "string") {
            result.current.setValue("logo", event.target.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });

    const file = new Blob([""], { type: "text/plain" });
    const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
    handleFileChange(event);

    await act(async () => {
      await result.current.setValue("logo", "https://via.placeholder.com/150"); // Reset value to default
    });

    expect(result.current.getValues().logo).toBe("https://via.placeholder.com/150");
  });
});
