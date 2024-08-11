import { Autocomplete, TextField } from "@mui/material";
import { useEffect } from "react";

interface SearchableDropdownProps {
  items: string[];
  selectedItem: string | null;
  placeholderItemText: string | null;
  setSelectedItem: (item: string | null) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  items,
  selectedItem,
  placeholderItemText,
  setSelectedItem,
}) => { 
  return (
    <Autocomplete
      options={items}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={placeholderItemText} variant="outlined" />
      )}
      value={selectedItem}
      onChange={(event, newValue) => setSelectedItem(newValue)}
    />
  );
};

export default SearchableDropdown;