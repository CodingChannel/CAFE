import { AppActionKind } from "../constants";
import { EmployeeDto } from "../../models/dto/EmployeeDto";

// Fetch Employees Actions
export const fetchEmployees = () => ({
  type: AppActionKind.FETCH_EMPLOYEES_REQUEST,
});

export const fetchEmployeesSuccess = (employees: EmployeeDto[]) => ({
  type: AppActionKind.FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const fetchEmployeesFailure = (error: string) => ({
  type: AppActionKind.FETCH_EMPLOYEES_FAILURE,
  payload: error,
});

export const setEmployeeToBeEdited = (employee: EmployeeDto) => ({
  type: AppActionKind.SET_EMPLOYEE_TOBE_EDITED,
  payload: employee,
});
export const setEmployeeId = (id: string) => ({
  type: AppActionKind.FETCH_EMPLOYEE_REQUEST,
  payload : id
});

export const fetchEmployeeSuccess = (isFetchSuccessful: boolean) => ({
  type: AppActionKind.FETCH_EMPLOYEE_SUCCESS,
  payload: isFetchSuccessful,
});

export const fetchEmployeeFailure = (error: string) => ({
  type: AppActionKind.FETCH_EMPLOYEE_FAILURE,
  payload: error,
});

// Add Employee Actions
export const addEmployeeRequest = (employee: EmployeeDto) => ({
  type: AppActionKind.ADD_EMPLOYEE_REQUEST,
  payload: employee,
});

export const addEmployeeSuccess = (isAddSuccessful: boolean) => ({
  type: AppActionKind.ADD_EMPLOYEE_SUCCESS,
  payload: isAddSuccessful,
});

export const addEmployeeFailure = (error: string) => ({
  type: AppActionKind.ADD_EMPLOYEE_FAILURE,
  payload: error,
});

// Update Employee Actions
export const updateEmployeeRequest = (employee: EmployeeDto) => ({
  type: AppActionKind.UPDATE_EMPLOYEE_REQUEST,
  payload: employee,
});

export const updateEmployeeSuccess = (isUpdateSuccessful: boolean) => ({
  type: AppActionKind.UPDATE_EMPLOYEE_SUCCESS,
  payload: isUpdateSuccessful,
});

export const updateEmployeeFailure = (error: string) => ({
  type: AppActionKind.UPDATE_EMPLOYEE_FAILURE,
  payload: error,
});

// Delete Employee Actions
export const deleteEmployeeRequest = (id: string) => ({
  type: AppActionKind.DELETE_EMPLOYEE_REQUEST,
  payload: id,
});

export const deleteEmployeeSuccess = (id: string) => ({
  type: AppActionKind.DELETE_EMPLOYEE_SUCCESS,
  payload: id,
});

export const deleteEmployeeFailure = (error: string) => ({
  type: AppActionKind.DELETE_EMPLOYEE_FAILURE,
  payload: error,
});
