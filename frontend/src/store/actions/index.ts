import { CafeDto } from "../../models/dto/CafeDto";
import { EmployeeDto } from "../../models/dto/EmployeeDto";
import { AppActionKind } from "../constants";

export interface PayloadParams {
  path: string;
  params: {
    sortBy: string;
  };
}

export interface PayloadDeleteParams {
  params: {
    recordId: string;
  };
}
export interface AppAction {
  type: AppActionKind;
  payload: string | PayloadParams | PayloadDeleteParams | unknown | undefined | EmployeeDto | CafeDto;
}
