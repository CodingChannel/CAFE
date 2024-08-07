import axios from "axios";
import { EmployeeDto } from "../../models/dto/EmployeeDto";

const API_URL = process.env.REACT_APP_API_URL + "/api";

export const getEmployees = async (cafeId?: string): Promise<EmployeeDto[]> => {
  const url = cafeId
    ? `${API_URL}/employees?cafeId=${cafeId}` // Add cafeId query param
    : `${API_URL}/employees`; // Default URL for all employees

  const response = await axios.get(url);
  return response.data;
};

export const getEmployeeById = async (employeeId: string): Promise<EmployeeDto> => {
  console.log(employeeId);
  const response = await axios.get(`${API_URL}/employees/${employeeId}`);
  return response.data;
};

export const createEmployee = async (employee: EmployeeDto): Promise<EmployeeDto> => {
  const response = await axios.post(`${API_URL}/employees`, employee);
  return response.data;
};

export const updateEmployee = async (employee: EmployeeDto): Promise<EmployeeDto> => {
  const response = await axios.put(`${API_URL}/employees/${employee.id}`, employee);
  return response.data;
};

export const deleteEmployee = async (employeeId: string): Promise<void> => {
  await axios.delete(`${API_URL}/employees/${employeeId}`);
};

export default {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
