import { CafeDto } from "./dto/CafeDto";
import { EmployeeDto } from "./dto/EmployeeDto";

export interface AppState {
  cafes: CafeDto[];
  employees: EmployeeDto[];

  loading: boolean;
  error: any;
}
export const initialState: AppState = {
  cafes: [],
  employees: [],
  loading: false,
  error: '',
};
