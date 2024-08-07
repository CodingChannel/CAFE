import { AppAction } from "./../actions/index";
import { call, put, takeLatest } from "redux-saga/effects";
import { fetchEmployeesSuccess, fetchEmployeesFailure, addEmployeeSuccess, addEmployeeFailure, updateEmployeeSuccess, updateEmployeeFailure, deleteEmployeeSuccess, deleteEmployeeFailure, fetchEmployeeFailure, fetchEmployeeSuccess, setEmployeeToBeEdited, addEmployeeRequest } from "../actions/EmployeeAction";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } from "../services/EmployeeService";
import { EmployeeDto } from "../../models/dto/EmployeeDto";

function* fetchEmployeesSaga(action: AppAction) {
  const cafeId = action.payload ? action.payload.toString() : "";
  try {
    const employees: EmployeeDto[] = yield call(getEmployees, cafeId);
    yield put(fetchEmployeesSuccess(employees));
  } catch (error: any) {
    yield put(fetchEmployeesFailure(error.message));
  }
}

function* fetchEmployeeSaga(action: AppAction) {
  const id = action.payload ? action.payload.toString() : "";
  try {
    const employee: EmployeeDto = yield call(getEmployeeById, id);
    yield put(setEmployeeToBeEdited(employee));
    yield put(fetchEmployeeSuccess(true));
  } catch (error: any) {
    yield put(fetchEmployeeFailure(error.message));
  }
}
function* addEmployeeSaga(action: any) {
  try {
    yield call(createEmployee, action.payload);
    yield put(addEmployeeSuccess(true));
  } catch (error: any) {
    yield put(addEmployeeFailure(error.message));
  }
}

function* updateEmployeeSaga(action: any) {
  try {
    yield call(updateEmployee, action.payload);
    yield put(updateEmployeeSuccess(true));
  } catch (error: any) {
    yield put(updateEmployeeFailure(error.message));
  }
}

function* deleteEmployeeSaga(action: any) {
  try {
    yield call(deleteEmployee, action.payload);
    yield put(deleteEmployeeSuccess(action.payload));
  } catch (error: any) {
    yield put(deleteEmployeeFailure(error.message));
  }
}

function* employeeSaga() {
  yield takeLatest("FETCH_EMPLOYEES_REQUEST", fetchEmployeesSaga);
  yield takeLatest("FETCH_EMPLOYEE_REQUEST", fetchEmployeeSaga);
  yield takeLatest("ADD_EMPLOYEE_REQUEST", addEmployeeSaga);
  yield takeLatest("UPDATE_EMPLOYEE_REQUEST", updateEmployeeSaga);
  yield takeLatest("DELETE_EMPLOYEE_REQUEST", deleteEmployeeSaga);
}

export default employeeSaga;
