import React from "react";
import { Controller, useForm, FieldValues } from "react-hook-form";
import { Box, FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { CafeDto } from "../models/dto/CafeDto";

interface EmployeeFormFieldsProps {
  control: any;
  cafes: any[];
  errors: any;
}


const EmployeeFormFields: React.FC<EmployeeFormFieldsProps> = ({ control, cafes, errors }) => {
  errors = useForm<CafeDto>().formState;
  return (
    <>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.name}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required", minLength: { value: 6, message: "Name must be at least 6 characters" }, maxLength: { value: 10, message: "Name must be at most 10 characters" } }}
            render={({ field }) => (
              <>
                <TextField label="Name" {...field} required fullWidth inputProps={{ minLength: 6, maxLength: 10 }} />
                <FormHelperText>{errors.name?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.startDate}>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: "Start date is required" }}
            render={({ field }) => (
              <>
                <TextField {...field} type="date" InputLabelProps={{ shrink: true }} required fullWidth placeholder="Start Date" />
                <FormHelperText>{errors.startDate?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.emailAddress}>
          <Controller
            name="emailAddress"
            control={control}
            rules={{ required: "Email address is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } }}
            render={({ field }) => (
              <>
                <TextField label="Email" {...field} required fullWidth type="email" />
                <FormHelperText>{errors.emailAddress?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.phoneNumber}>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Phone number is required", pattern: { value: /^[89]\d{7}$/, message: "Phone number must start with 8 or 9 and be 8 digits long" } }}
            render={({ field }) => (
              <>
                <TextField label="Phone Number" {...field} required fullWidth inputProps={{ pattern: "^[89]\\d{7}$" }} />
                <FormHelperText>{errors.phoneNumber?.message}</FormHelperText>
              </>
            )}
          />
        </FormControl>
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
                  <FormControlLabel value="female" control={<Radio  required />} label="Female" />
                </RadioGroup>
              </>
            )}
          />
          <FormHelperText>
            {errors.gender?.message} {"Gender is required"}
          </FormHelperText>
        </FormControl>
      </Box>
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth error={!!errors.cafeId}>
          <InputLabel>Assigned Cafe</InputLabel>
          <Controller
            name="cafeId"
            control={control}
            rules={{ required: "Assigned cafe is required" }}
            render={({ field }) => (
              <>
                <Select {...field} label="Assigned Cafe" required>
                  {cafes.map((cafe) => (
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
