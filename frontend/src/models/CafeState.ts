import { CafeDto } from "./dto/CafeDto";

export interface CafeState {
  cafes: CafeDto[];           // List of all cafes
  currentCafe?: CafeDto;      // Currently fetched single cafe (optional)
  loading: boolean;                   // Loading state for any ongoing request
  error: string;                      // General error message
  fetchCafeError?: string;        // Specific error for fetching a single cafe
  addCafeError?: string;          // Specific error for adding an cafe
  updateCafeError?: string;       // Specific error for updating an cafe
  deleteCafeError?: string;       // Specific error for deleting an cafe
  cafeId: string;                 // ID of the cafe currently being fetched or acted upon
  isFetchCafeSuccessful: boolean; // Status of Fetch cafe
  isAddSuccessful: boolean;           // Status of Add cafe
  isUpdateSuccessful: boolean;        // Status of Update cafe
  isDeleteSuccessful: boolean;        // Status of Delete cafe
}

export const initialCafeState: CafeState = {
  cafes: [], // Initial empty list of cafes
  currentCafe: undefined, // No current cafe initially
  loading: false, // No ongoing requests initially
  error: '', // No general error initially
  fetchCafeError: undefined, // No error for fetching a single cafe initially
  addCafeError: undefined, // No error for adding an cafe initially
  updateCafeError: undefined, // No error for updating an cafe initially
  deleteCafeError: undefined, // No error for deleting an cafe initially
  cafeId: '',
  isFetchCafeSuccessful: false,
  isAddSuccessful: false,
  isUpdateSuccessful: false,
  isDeleteSuccessful: false
};
