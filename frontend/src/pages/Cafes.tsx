import React, { useEffect, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { Button, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCafeRequest, fetchCafes, fetchLocations, setSelectedCafeLocation } from "../store/actions/CafeAction";
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
  const gridApiRef = useRef(null);

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api;
    params.api.sizeColumnsToFit(); // Auto-size columns to fit the grid width
  };
  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchCafes());
  }, []);

  useEffect(() => {
    // Fetch cafes only if selectedLocation changes
    dispatch(fetchCafes(cafeState.selectedLocation));
  }, [cafeState.selectedLocation]);

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
      handleClose();
    }
  };

  const handleSelectedCafe = (id?: string | null) => {
    console.log(id);
    dispatch(setSelectedCafeEmployees(id));
    navigate(`/employees`);
  };

  const handleCafeButton = () => {
    dispatch(setSelectedCafeLocation(undefined));
  };

  const handleItemSelected = (item: string | null) => {
    dispatch(setSelectedCafeLocation(item));
  };

  const columns: ColDef[] | ColGroupDef[] = [
    { headerName: "Logo", field: "logo", cellRenderer: (params: any) => <img src={params.value} alt="logo" width="50" /> },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Employees",
      field: "employees",
      cellRenderer: (params: any) => (
        <Tooltip title={params.value ? "" : "No Employees exist for this cafe"} arrow>
          <span>
            <Button variant="contained" color="primary" onClick={() => handleSelectedCafe(params.data.id)} disabled={!params.value}>
              {params.value ? `${params.value} Employees` : "No Employees"}
            </Button>
          </span>
        </Tooltip>
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
        <h1 onClick={handleCafeButton} data-testid="page-cafes">
          Cafes
        </h1>
      </div>
      <div style={{ display: "flex", paddingBottom: "20px", paddingRight: "20px", justifyContent: "flex-end" }}>
        <SearchableDropdown items={cafeState.locations} placeholderItemText={`Search Location`} selectedItem={cafeState?.selectedLocation} setSelectedItem={handleItemSelected} />
        <Button variant="contained" data-testid="button-add-new-cafe" color="primary" onClick={() => navigate("/cafes/add")} style={{ marginLeft: "20px" }}>
          Add New Café
        </Button>
      </div>

      <AgGridReact rowData={cafeState.cafes} columnDefs={columns} pagination={true} onGridReady={onGridReady} />

      <ConfirmationDialog open={open} title="Delete Cafe" description="Are you sure you want to delete this cafe?" onClose={handleClose} onConfirm={handleDelete} />
    </div>
  );
};

export default Cafes;
