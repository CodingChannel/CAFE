import { EmployeeState, initialEmployeeState } from "../../models/EmployeeState";
import { EmployeeDto } from "../../models/dto/EmployeeDto";
import { AppAction } from "../actions";
import { AppActionKind } from "../constants";

export const employeeReducer = (state: EmployeeState = initialEmployeeState, action: AppAction): EmployeeState => {
  switch (action.type) {
    // Fetch Employees
    case AppActionKind.FETCH_EMPLOYEES_REQUEST:
      return { ...state, loading: true,  selectedCafeId: action.payload as string };
    case AppActionKind.FETCH_EMPLOYEES_SUCCESS:
      return { ...state, loading: false, employees: action.payload as EmployeeDto[] };
    case AppActionKind.FETCH_EMPLOYEES_FAILURE:
      return { ...state, loading: false, error: action.payload as string };

    // Fetch Single Employee
    case AppActionKind.FETCH_EMPLOYEE_REQUEST:
      const id = action.payload ? action.payload.toString() : "";
      return { ...state, loading: true, employeeId: id };
    case AppActionKind.SET_EMPLOYEE_TOBE_EDITED:
      return { ...state, loading: true, currentEmployee: action.payload as EmployeeDto };
    case AppActionKind.FETCH_EMPLOYEE_SUCCESS:
      return { ...state, loading: false, isFetchEmployeeSuccessful: action.payload as boolean };
    case AppActionKind.FETCH_EMPLOYEE_FAILURE:
      return { ...state, loading: false, fetchEmployeeError: action.payload as string };

    // Add Employee
    case AppActionKind.ADD_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case AppActionKind.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: [...state.employees],
      };
    case AppActionKind.ADD_EMPLOYEE_FAILURE:
      return { ...state, loading: false, addEmployeeError: action.payload as string };

    // Update Employee
    case AppActionKind.UPDATE_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case AppActionKind.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdateSuccessful: action.payload as boolean,
      };
    case AppActionKind.UPDATE_EMPLOYEE_FAILURE:
      return { ...state, loading: false, updateEmployeeError: action.payload as string };

    // Delete Employee
    case AppActionKind.DELETE_EMPLOYEE_REQUEST:
      return { ...state, loading: true };
    case AppActionKind.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
        isDeleteSuccessful: action.payload as boolean,
      };
    case AppActionKind.DELETE_EMPLOYEE_FAILURE:
      return { ...state, loading: false, deleteEmployeeError: action.payload as string };

    case AppActionKind.FETCH_CAFE_EMPLOYEES:
      return { ...state, loading: true, selectedCafeId: action.payload as string };

    default:
      return state;
  }
};
