import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import EmployeeFormFields from "./EmployeeFormFields";
import { EmployeeDto } from "../models/dto/EmployeeDto";
import { useDispatch, useSelector } from "react-redux";
import { EmployeeState } from "../models/EmployeeState";
import { fetchCafes } from "../store/actions/CafeAction";
import { addEmployeeRequest, setEmployeeId, updateEmployeeRequest } from "../store/actions/EmployeeAction";
import { CafeState } from "../models/CafeState";
const AddEditEmployee: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeDto>({
    defaultValues: {
      name: "",
      emailAddress: "",
      phoneNumber: "",
      gender: "",
      cafeId: null,
      startDate: "",
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employeeState: EmployeeState = useSelector((state: any) => state.employeeReducer);
  const cafeState: CafeState = useSelector((state: any) => state.cafeReducer);
  const isEdit = Boolean(id);
  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit) {
      dispatch(setEmployeeId(id as string));
    }
  }, [id, isEdit, dispatch]);

  useEffect(() => {
    const setEmployee = async () => {
      if (isEdit) {
        if (employeeState.currentEmployee) {
          reset({
            id: employeeState.currentEmployee.id,
            name: employeeState.currentEmployee.name,
            emailAddress: employeeState.currentEmployee.emailAddress,
            phoneNumber: employeeState.currentEmployee.phoneNumber,
            gender: employeeState.currentEmployee.gender,
            cafeId: employeeState.currentEmployee.cafeId || "",
            startDate: employeeState.currentEmployee.startDate ? new Date(employeeState.currentEmployee.startDate).toISOString().split("T")[0] : "",
          });
        }
      }
    };

    setEmployee();
  }, [employeeState.currentEmployee, reset]);

  const onSubmit = async (data: EmployeeDto) => {
    if (isEdit) {
      dispatch(updateEmployeeRequest(data));
    } else {
      dispatch(addEmployeeRequest(data));
    }
    dispatch(fetchCafes());
    navigate("/employees");
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Edit Employee" : "Add New Employee"}
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <EmployeeFormFields control={control} errors cafes={cafeState.cafes} />
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="contained" color="secondary" onClick={() => navigate("/employees")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEditEmployee;
