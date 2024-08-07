import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Box, FormControl, FormHelperText } from "@mui/material";

interface CafeFormFieldsProps {
  control: any; // Type with `Control` from `react-hook-form` can be used here
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: any;
} 

const CafeFormFields: React.FC<CafeFormFieldsProps> = ({ control, handleFileChange, errors}) => {
  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.name}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required", minLength: { value: 2, message: "Name must be at least 2 character" }, maxLength: { value: 50, message: "Name must be at most 50 characters" } }}
            render={({ field }) => (
              <>
                <TextField {...field} fullWidth label="Name" required inputProps={{ minLength: 1, maxLength: 50 }} data-testid="name-input" />
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
        <input type="file" onChange={handleFileChange} data-testid="file-input" />
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
