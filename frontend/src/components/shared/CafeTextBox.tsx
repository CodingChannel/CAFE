import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextField, FormControl, FormHelperText, TextFieldProps } from "@mui/material";

// Define a type for your custom text field props
interface CafeTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  control: Control<any>;
  rules?: object;
  errors?: any;
}

const CafeTextField: React.FC<CafeTextFieldProps> = ({ name, control, rules, errors, ...props }) => {
  return (
    <FormControl fullWidth error={!!errors?.[name]}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
            return (
              <>
                <TextField
                  {...field}
                  {...props}
                />
                {errors?.[name] && <FormHelperText>{errors[name]?.message}</FormHelperText>}
              </>
            );
          }}
      />
    </FormControl>
  );
};

export default CafeTextField;
