import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocations, setSelectedCafeLocation } from "../../store/actions/CafeAction";
import { CafeState } from "../../models/CafeState";

const SearchableDropdown: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | undefined | null>(null);
  const dispatch = useDispatch();
  const cafeState: CafeState = useSelector((state: any) => state.cafeReducer);

  useEffect(() => {
    dispatch(fetchLocations());
    setSelectedLocation(cafeState.selectedLocation);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedCafeLocation(selectedLocation));
  }, [selectedLocation, dispatch]);

  return <Autocomplete options={cafeState.locations} getOptionLabel={(option) => option} style={{ width: 300 }} renderInput={(params) => <TextField {...params} label="Search Location" variant="outlined" />} value={selectedLocation} onChange={(event, newValue) => setSelectedLocation(newValue)} />;
};

export default SearchableDropdown;
