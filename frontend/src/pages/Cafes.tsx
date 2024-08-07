import React, { useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCafeRequest, fetchCafes } from "../store/actions/CafeAction";
import { CafeState } from "../models/CafeState";

const Cafes: React.FC = () => {
  const cafeState: CafeState = useSelector((state: any) => state.cafeReducer);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    dispatch(deleteCafeRequest(id));
    dispatch(fetchCafes());
  };

  const columns: ColDef[] | ColGroupDef[] = [
    { headerName: "Logo", field: "logo", cellRenderer: (params: any) => <img src={params.value} alt="logo" width="50" /> },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    { headerName: "Employees", field: "employees" },
    { headerName: "Location", field: "location" },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params: any) => (
        <>
          <Button variant="contained" color="primary" onClick={() => navigate(`/cafes/${params.value}`)}>
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
        <h1>Cafes</h1>
      </div>
      <div style={{ display: "flex", paddingBottom: "20px", paddingRight: "20px", justifyContent: "flex-end" }}>
        <Button variant="contained" color="primary" onClick={() => navigate("/cafes/add")} style={{ display: "flex", justifyContent: "flex-start" }}>
          Add New Cafe
        </Button>
      </div>

      <AgGridReact rowData={cafeState.cafes} columnDefs={columns} pagination={true} />
    </div>
  );
};

export default Cafes;
