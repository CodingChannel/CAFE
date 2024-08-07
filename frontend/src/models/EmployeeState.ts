import { EmployeeDto } from "./dto/EmployeeDto";

export interface EmployeeState {
  employees: EmployeeDto[];           // List of all employees
  currentEmployee?: EmployeeDto;      // Currently fetched single employee (optional)
  loading: boolean;                   // Loading state for any ongoing request
  error: string;                      // General error message
  fetchEmployeeError?: string;        // Specific error for fetching a single employee
  addEmployeeError?: string;          // Specific error for adding an employee
  updateEmployeeError?: string;       // Specific error for updating an employee
  deleteEmployeeError?: string;       // Specific error for deleting an employee
  employeeId: string;                 // ID of the employee currently being fetched or acted upon
  isFetchEmployeeSuccessful: boolean; // Status of Fetch employee
  isAddSuccessful: boolean;           // Status of Add employee
  isUpdateSuccessful: boolean;        // Status of Update employee
  isDeleteSuccessful: boolean;        // Status of Delete employee
}

export const initialEmployeeState: EmployeeState = {
  employees: [], // Initial empty list of employees
  currentEmployee: undefined, // No current employee initially
  loading: false, // No ongoing requests initially
  error: '', // No general error initially
  fetchEmployeeError: undefined, // No error for fetching a single employee initially
  addEmployeeError: undefined, // No error for adding an employee initially
  updateEmployeeError: undefined, // No error for updating an employee initially
  deleteEmployeeError: undefined, // No error for deleting an employee initially
  employeeId: '',
  isFetchEmployeeSuccessful: false,
  isAddSuccessful: false,
  isUpdateSuccessful: false,
  isDeleteSuccessful: false
};
