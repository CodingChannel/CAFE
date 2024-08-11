import React from 'react';
import { Box } from '@mui/material'; 
import { Control } from 'react-hook-form';
import CafeTextField from './shared/CafeTextBox';

interface CafeFormFieldsProps {
    control: Control<any>; // Type with `Control` from `react-hook-form` is used here
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors: any; // Adjust this type based on how you structure your form errors
    error: any; // Type this according to your error structure
    fileData: any; // Type this according to your file data structure
}

const CafeFormFields: React.FC<CafeFormFieldsProps> = ({ control, handleFileChange, errors, error, fileData }) => {
    return (
        <div>
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
                <CafeTextField
                    name="description"
                    control={control}
                    label="Description"
                    required
                    inputProps={{ maxLength: 256 }}
                    rules={{ required: "Description is required", maxLength: { value: 256, message: "Description must be at most 256 characters" } }}
                    errors={errors}
                    data-testid="description-input"
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        data-testid="file-input" 
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {fileData && <img src={fileData} alt="Preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />}
                </div>
            </Box>
            <Box sx={{ mb: 2 }}>
                <CafeTextField
                    name="location"
                    control={control}
                    label="Location"
                    required
                    rules={{ required: "Location is required" }}
                    errors={errors}
                    data-testid="location-input"
                />
            </Box>
        </div>
    );
};

export default CafeFormFields;
