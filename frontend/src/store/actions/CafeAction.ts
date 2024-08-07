import { AppActionKind } from "../constants";
import { CafeDto } from "../../models/dto/CafeDto";

// Fetch Cafes Actions
export const fetchCafes = (selectedLocation?: string | undefined | null) => ({
  type: AppActionKind.FETCH_CAFES_REQUEST,
  payload: selectedLocation,
});

export const fetchCafesSuccess = (cafes: CafeDto[]) => ({
  type: AppActionKind.FETCH_CAFES_SUCCESS,
  payload: cafes,
});

export const fetchCafesFailure = (error: string) => ({
  type: AppActionKind.FETCH_CAFES_FAILURE,
  payload: error,
});

export const fetchLocations = () => ({
  type: AppActionKind.FETCH_LOCATIONS_REQUEST,
});

export const fetchLocationsSuccess = (locations: string[]) => ({
  type: AppActionKind.FETCH_LOCATIONS_SUCCESS,
  payload: locations,
});

export const fetchLocationsFailure = (error: string) => ({
  type: AppActionKind.FETCH_LOCATIONS_FAILURE,
  payload: error,
});

export const setCafeToBeEdited = (cafe: CafeDto) => ({
  type: AppActionKind.SET_CAFE_TOBE_EDITED,
  payload: cafe,
});
export const setCafeId = (id: string) => ({
  type: AppActionKind.FETCH_CAFE_REQUEST,
  payload: id,
});

export const fetchCafeSuccess = (isFetchSuccessful: boolean) => ({
  type: AppActionKind.FETCH_CAFE_SUCCESS,
  payload: isFetchSuccessful,
});

export const fetchCafeFailure = (error: string) => ({
  type: AppActionKind.FETCH_CAFE_FAILURE,
  payload: error,
});

// Add Cafe Actions
export const addCafeRequest = (cafe: CafeDto) => ({
  type: AppActionKind.ADD_CAFE_REQUEST,
  payload: cafe,
});

export const addCafeSuccess = (isAddSuccessful: boolean) => ({
  type: AppActionKind.ADD_CAFE_SUCCESS,
  payload: isAddSuccessful,
});

export const addCafeFailure = (error: string) => ({
  type: AppActionKind.ADD_CAFE_FAILURE,
  payload: error,
});

// Update Cafe Actions
export const updateCafeRequest = (cafe: CafeDto) => ({
  type: AppActionKind.UPDATE_CAFE_REQUEST,
  payload: cafe,
});

export const updateCafeSuccess = (isUpdateSuccessful: boolean) => ({
  type: AppActionKind.UPDATE_CAFE_SUCCESS,
  payload: isUpdateSuccessful,
});

export const updateCafeFailure = (error: string) => ({
  type: AppActionKind.UPDATE_CAFE_FAILURE,
  payload: error,
});

// Delete Cafe Actions
export const deleteCafeRequest = (id: string) => ({
  type: AppActionKind.DELETE_CAFE_REQUEST,
  payload: id,
});

export const deleteCafeSuccess = (id: string) => ({
  type: AppActionKind.DELETE_CAFE_SUCCESS,
  payload: id,
});

export const deleteCafeFailure = (error: string) => ({
  type: AppActionKind.DELETE_CAFE_FAILURE,
  payload: error,
});

export const setSelectedCafeLocation = (selectedLocation?: string | undefined | null) => ({
  type: AppActionKind.FETCH_CAFE_LOCATION,
  payload: selectedLocation,
});
