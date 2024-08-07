import { CafeState, initialCafeState } from "../../models/CafeState";
import { CafeDto } from "../../models/dto/CafeDto";
import { AppAction } from "../actions";
import { AppActionKind } from "../constants";

export const cafeReducer = (state: CafeState = initialCafeState, action: AppAction): CafeState => {
  switch (action.type) {
    // Fetch Cafes
    case AppActionKind.FETCH_CAFES_REQUEST:
      return { ...state, loading: true, selectedLocation: action.payload as string };
    case AppActionKind.FETCH_CAFES_SUCCESS:
      return { ...state, loading: false, cafes: action.payload as CafeDto[] };
    case AppActionKind.FETCH_CAFES_FAILURE:
      return { ...state, loading: false, error: action.payload as string };

    // Fetch Locations
    case AppActionKind.FETCH_LOCATIONS_REQUEST:
      return { ...state, loading: true };
    case AppActionKind.FETCH_LOCATIONS_SUCCESS:
      return { ...state, loading: false, locations: action.payload as string[] };
    case AppActionKind.FETCH_LOCATIONS_FAILURE:
      return { ...state, loading: false, error: action.payload as string };

    // Fetch Single Cafe
    case AppActionKind.FETCH_CAFE_REQUEST:
      const id = action.payload ? action.payload.toString() : "";
      return { ...state, loading: true, cafeId: id };
    case AppActionKind.SET_CAFE_TOBE_EDITED:
      return { ...state, loading: true, currentCafe: action.payload as CafeDto };
    case AppActionKind.FETCH_CAFE_SUCCESS:
      return { ...state, loading: false, isFetchCafeSuccessful: action.payload as boolean };
    case AppActionKind.FETCH_CAFE_FAILURE:
      return { ...state, loading: false, fetchCafeError: action.payload as string };

    // Add Cafe
    case AppActionKind.ADD_CAFE_REQUEST:
      return { ...state, loading: true };
    case AppActionKind.ADD_CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
        cafes: [...state.cafes],
      };
    case AppActionKind.ADD_CAFE_FAILURE:
      return { ...state, loading: false, addCafeError: action.payload as string };

    // Update Cafe
    case AppActionKind.UPDATE_CAFE_REQUEST:
      return { ...state, loading: true };
    case AppActionKind.UPDATE_CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdateSuccessful: action.payload as boolean,
      };
    case AppActionKind.UPDATE_CAFE_FAILURE:
      return { ...state, loading: false, updateCafeError: action.payload as string };

    // Delete Cafe
    case AppActionKind.DELETE_CAFE_REQUEST:
      return { ...state, loading: true };
    case AppActionKind.DELETE_CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
        cafes: state.cafes.filter((emp) => emp.id !== action.payload),
        isDeleteSuccessful: action.payload as boolean,
      };
    case AppActionKind.DELETE_CAFE_FAILURE:
      return { ...state, loading: false, deleteCafeError: action.payload as string };

      case AppActionKind.FETCH_CAFE_LOCATION:
        return { ...state, loading: false, selectedLocation: action.payload as string };
  
    default:
      return state;
  }
};
