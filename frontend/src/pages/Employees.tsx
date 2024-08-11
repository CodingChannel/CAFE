import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Button, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployeeRequest, fetchEmployees, setSelectedCafeEmployees } from "../store/actions/EmployeeAction";
import { EmployeeState } from "../models/EmployeeState";
import ConfirmationDialog from "../components/shared/ConfirmationDialog";

const Employees: React.FC = () => {
  const employeeState: EmployeeState = useSelector((state: any) => state.employeeReducer);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedEmployeeId(null);
  };
  const gridApiRef = useRef(null);

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;
    params.api.sizeColumnsToFit(); // Auto-size columns to fit the grid width
  };
  const handleClickOpen = (id: string) => {
    setSelectedEmployeeId(id);
    setOpen(true);
  };
  useEffect(() => {
    dispatch(fetchEmployees(employeeState.selectedCafeId));
  }, [dispatch]);

  const handleDelete = () => {
    if (selectedEmployeeId) {
      dispatch(deleteEmployeeRequest(selectedEmployeeId));
      dispatch(fetchEmployees(employeeState.selectedCafeId));
      setOpen(false);
      setSelectedEmployeeId(null);
    }
  };

  const handleEmployeesButton = () => {
    dispatch(setSelectedCafeEmployees(null));
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
          <Button variant="contained" color="secondary" onClick={() => handleClickOpen(params.value)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  const cafeName = employeeState.employees?.[0]?.cafe?.name;

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      {/* DRY to be implmented, make another component like master page. */}
      <div style={{ display: "flex", paddingLeft: "20px", justifyContent: "flex-start", flexDirection: "row" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/" onClick={handleEmployeesButton}>
            <h1>Employees</h1>
          </Link>
          {employeeState.selectedCafeId && (
            <Link underline="hover" color="inherit" href="/" onClick={handleEmployeesButton}>
              <h1>{`Cafe  `}</h1>
            </Link>
          )}
          {employeeState.selectedCafeId && (
            <>
              <Link underline="hover" color="inherit" href="/" onClick={handleEmployeesButton}>
                <h1>{`   ${cafeName}`}</h1>
              </Link>
            </>
          )}
        </Breadcrumbs>
      </div>
      <div style={{ display: "flex", paddingBottom: "20px", paddingRight: "20px", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/employees/add")} style={{ display: "flex", justifyContent: "flex-start" }}>
          Add New Employee
        </Button>
      </div>

      <AgGridReact rowData={employeeState.employees} columnDefs={columns} pagination={true} onGridReady={onGridReady} />

      <ConfirmationDialog open={open} title="Delete Cafe" description="Are you sure you want to delete this employee?" onClose={handleClose} onConfirm={handleDelete} />
    </div>
  );
};

export default Employees;
