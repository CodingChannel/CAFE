import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployeeRequest, fetchEmployees } from "../store/actions/EmployeeAction";
import { EmployeeState } from "../models/EmployeeState";

const Employees: React.FC = () => {
  const employeeState: EmployeeState = useSelector((state: any) => state.employeeReducer);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    dispatch(deleteEmployeeRequest(id));
    dispatch(fetchEmployees());
  };

  const columns: ColDef[] | ColGroupDef[] = [
    { headerName: "Employee ID", field: "id" },
    { headerName: "Name", field: "name" },
    { headerName: "Email", field: "emailAddress" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Phone Number", field: "phoneNumber" },
    { headerName: "Days Worked", field: "daysWorked" },
    { headerName: "Cafe Name", field: "cafe.name" },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params: any) => (
        <>
          <Button variant="contained" color="primary" onClick={() => navigate(`/employees/${params.value}`)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(params.value)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      {/* DRY to be implmented, make another component like master page. */}
      <div style={{ display: "flex", paddingBottom: "20px", paddingLeft: "20px", justifyContent: "flex-start" }}>
        <h1>Employees</h1>
      </div>
      <div style={{ display: "flex", paddingBottom: "20px", paddingRight: "20px", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/employees/add")} style={{ display: "flex", justifyContent: "flex-start" }}>
          Add New Employee
        </Button>
      </div>

      <AgGridReact rowData={employeeState.employees} columnDefs={columns} pagination={true} />
    </div>
  );
};

export default Employees;
