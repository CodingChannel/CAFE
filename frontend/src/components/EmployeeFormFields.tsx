import React from "react";
import { Box, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import CafeTextField from "./shared/CafeTextBox";
import { CafeDto } from "../models/dto/CafeDto";

interface EmployeeFormFieldsProps {
  control: Control<any>; // Type with `Control` from `react-hook-form` is used here
  errors: any; // Adjust this type based on how you structure your form errors
  cafes?: CafeDto[];
}
const EmployeeFormFields: React.FC<EmployeeFormFieldsProps> = ({ control, cafes, errors }) => {
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <CafeTextField
          name="name"
          control={control}
          label="Name"
          required
          inputProps={{ minLength: 6, maxLength: 10 }}
          rules={{ required: "Name is required", minLength: { value: 6, message: "Name must be at least 6 characters" }, maxLength: { value: 10, message: "Name must be at most 10 characters" } }}
          errors={errors}
          data-testid="name-input"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <CafeTextField name="startDate" control={control} type="date" InputLabelProps={{ shrink: true }} required fullWidth placeholder="Start Date" rules={{ required: "Start date is required" }} errors={errors} data-testid="startDate-input" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <CafeTextField name="emailAddress" control={control} label="Email" required fullWidth type="email" rules={{ required: "Email address is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }} errors={errors} data-testid="emailAddress-input" />
      </Box>
      <Box sx={{ mb: 2 }}>
        <CafeTextField
          name="phoneNumber"
          control={control}
          label="Phone Number"
          required
          fullWidth
          inputProps={{ pattern: "^[89]\\d{7}$" }}
          rules={{ required: "Phone number is required", pattern: { value: /^[89]\d{7}$/, message: "Phone number must start with 8 or 9 and be 8 digits long" } }}
          errors={errors}
          data-testid="phoneNumber-input"
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.gender}>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required" }}
            render={({ field }) => (
              <>
                <RadioGroup {...field} row>
                  <FormControlLabel value="male" control={<Radio required />} label="Male" />
                  <FormControlLabel value="female" control={<Radio required />} label="Female" />
                </RadioGroup>
              </>
            )}
          />
          <FormHelperText>{errors.gender?.message}</FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.cafeId}>
          <InputLabel>Assigned Cafe</InputLabel>
          <Controller
            name="cafeId"
            control={control}
            render={({ field }) => (
              <>
                <Select {...field} label="Assigned Cafe">
                  {cafes?.map((cafe: CafeDto) => (
                    <MenuItem key={cafe.id} value={cafe.id}>
                      {cafe.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.cafeId?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default EmployeeFormFields;