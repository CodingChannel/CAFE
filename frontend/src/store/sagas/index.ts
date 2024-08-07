import { all, fork } from "redux-saga/effects";
import cafeSaga from "./CafeSaga";
import employeeSaga from "./EmployeeSaga";

export default function* rootSaga() {
  yield all([fork(cafeSaga), fork(employeeSaga)]);
}
