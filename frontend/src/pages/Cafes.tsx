import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCafeRequest, fetchCafes, setSelectedCafeLocation } from "../store/actions/CafeAction";
import { CafeState } from "../models/CafeState";
import ConfirmationDialog from "../components/shared/ConfirmationDialog";
import SearchableDropdown from "../components/shared/SearchableDropdown";
import { setSelectedCafeEmployees } from "../store/actions/EmployeeAction";

const Cafes: React.FC = () => {
  const cafeState: CafeState = useSelector((state: any) => state.cafeReducer);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCafes(cafeState.selectedLocation));
  }, [cafeState.selectedLocation, dispatch]);

  const handleClickOpen = (id: string) => {
    setSelectedCafeId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCafeId(null);
  };

  const handleDelete = () => {
    if (selectedCafeId) {
      dispatch(deleteCafeRequest(selectedCafeId));
      dispatch(fetchCafes(cafeState.selectedLocation));
      setOpen(false);
      setSelectedCafeId(null);
    }
  };
  const handleSelectedCafe = (id?: string | undefined | null) => {
    dispatch(setSelectedCafeEmployees(id));
    navigate(`/employees`);
  };

  const handleCafeButton = () => {
    dispatch(setSelectedCafeLocation(undefined));
    navigate("/cafes");
  };

  const columns: ColDef[] | ColGroupDef[] = [
    { headerName: "Logo", field: "logo", cellRenderer: (params: any) => <img src={params.value} alt="logo" width="50" /> },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Employees",
      field: "employees",
      cellRenderer: (params: any) => (
        <>
          <Button variant="contained" color="primary" onClick={() => handleSelectedCafe(params.data.id)}>
            {params.value} Employees
          </Button>
        </>
      ),
    },
    { headerName: "Location", field: "location" },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params: any) => (
        <>
          <Button variant="contained" color="primary" onClick={() => navigate(`/cafes/${params.value}`)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleClickOpen(params.value)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <div style={{ display: "flex", paddingLeft: "20px", justifyContent: "flex-start" }}>
        <h1 onClick={handleCafeButton}>Cafes</h1>
      </div>
      <div style={{ display: "flex", paddingBottom: "20px", paddingRight: "20px", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", paddingRight: "20px", justifyContent: "flex-end" }}>
          <SearchableDropdown />
        </div>
        <div style={{ display: "flex", paddingRight: "20px", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/cafes/add")} style={{ display: "flex", justifyContent: "flex-start" }}>
            Add New Café
          </Button>
        </div>
      </div>

      <AgGridReact rowData={cafeState.cafes} columnDefs={columns} pagination={true} />

      <ConfirmationDialog open={open} title="Delete Cafe" description="Are you sure you want to delete this cafe?" onClose={handleClose} onConfirm={handleDelete} />
    </div>
  );
};

export default Cafes;
