import { employeeReducer } from "./EmployeeReducer";
import { cafeReducer } from "./CafeReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cafeReducer: cafeReducer,
  employeeReducer: employeeReducer,
});
export default rootReducer;
