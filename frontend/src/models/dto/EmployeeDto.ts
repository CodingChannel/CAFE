import { v4 as uuidv4 } from "uuid";
import { CafeDto } from "./CafeDto";

export interface AddEditEmployeeFormValues {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  gender: string;
  cafeId: string;
  startDate?: string | Date;
}

export interface EmployeeDto {
  id?: string;
  name: string;
  emailAddress: string;
  gender: string;
  phoneNumber: string;
  startDate?: Date | string;
  daysWorked?: number;
  cafeId?: string; // Optional cafe name
  cafe?: CafeDto;
}

export const createEmployee = (employeeData: Omit<EmployeeDto, "id">): EmployeeDto => ({
  ...employeeData,
  id: uuidv4(),
  daysWorked: 0, // Initialize daysWorked to 0
});

export const updateEmployee = (employee: EmployeeDto, updateData: Partial<EmployeeDto>): EmployeeDto => ({
  ...employee,
  ...updateData,
});
