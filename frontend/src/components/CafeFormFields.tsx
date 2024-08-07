import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Box, FormControl, FormHelperText } from "@mui/material";
interface CafeFormFieldsProps {
  control: any; // Type with `Control` from `react-hook-form` can be used here
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
  error: any;
  fileData: any;
}

const CafeFormFields: React.FC<CafeFormFieldsProps> = ({ control, handleFileChange, errors, error, fileData }) => {
  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.name}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required", minLength: { value: 6, message: "Name must be at least 6 character" }, maxLength: { value: 10, message: "Name must be at most 10 characters" } }}
            render={({ field }) => (
              <>
                <TextField {...field} fullWidth label="Name" required inputProps={{ minLength: 6, maxLength: 10 }} data-testid="name-input" />
                <FormHelperText>{errors?.name?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.description}>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required", maxLength: { value: 256, message: "Description must be at most 256 characters" } }}
            render={({ field }) => (
              <>
                <TextField {...field} fullWidth label="Description" required inputProps={{ maxLength: 256 }} data-testid="description-input" />
                <FormHelperText>{errors.description?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <div>
          <input type="file" onChange={handleFileChange} data-testid="file-input" style={{ width: "50px", height: "50px" }} />
          {error && <p style={{ color: "red" }}>{error}</p>}
          {fileData && <img src={fileData} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />}
        </div>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.location}>
          <Controller
            name="location"
            control={control}
            rules={{ required: "Location is required" }}
            render={({ field }) => (
              <>
                <TextField {...field} fullWidth label="Location" required data-testid="location-input" />
                <FormHelperText>{errors.location?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
    </div>
  );
};

export default CafeFormFields;
