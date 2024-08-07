import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { CafeDto } from "../models/dto/CafeDto";
import CafeFormFields from "./CafeFormFields";
import { useDispatch, useSelector } from "react-redux";
import { CafeState } from "../models/CafeState";
import { setCafeId, updateCafeRequest, addCafeRequest } from "../store/actions/CafeAction";

const AddEditCafe: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cafeState: CafeState = useSelector((state: any) => state.cafeReducer);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    reset,
    // watch,
  } = useForm<CafeDto>({
    defaultValues: {
      name: "",
      description: "",
      logo: "https://via.placeholder.com/150",
      location: "",
      employees: 0,
    },
  });

  const isEdit = Boolean(id);
  useEffect(() => {
    if (isEdit) {
      dispatch(setCafeId(id as string));
    }
  }, [id, isEdit, dispatch]);

  const [error, setError] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file type
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setError("Only JPEG and PNG files are allowed.");
        setFileData(null);
        return;
      }

      // Validate file size
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setError("File size exceeds 2MB.");
        setFileData(null);
        return;
      }

      // File is valid, process it
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setFileData(event.target.result);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const setEmployee = async () => {
      if (isEdit && cafeState.currentCafe) {
        reset({
          id: cafeState.currentCafe.id,
          name: cafeState.currentCafe.name,
          description: cafeState.currentCafe.description,
          logo: cafeState.currentCafe.logo || "https://via.placeholder.com/150",
          location: cafeState.currentCafe.location,
          employees: cafeState.currentCafe.employees || 0,
        });
      }
    };

    setEmployee();
  }, [isEdit, cafeState.currentCafe, reset]);

  const onSubmit = (data: CafeDto) => {
    if (isSubmittingRef.current) return; // Prevent multiple submissions
    setIsSubmitting(true);
    isSubmittingRef.current = true; // Set the ref to true

    try {
      if (isEdit) {
        dispatch(updateCafeRequest(data));
      } else {
        dispatch(addCafeRequest(data));
      }
    } catch (error) {
      console.error("Failed to submit the form", error);
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false; // Reset the ref to false
      navigate("/cafes");
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = ""; // Show the browser's default confirmation dialog
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? "Edit Cafe" : "Add New Cafe"}
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
      >
        <CafeFormFields control={control} errors={errors} handleFileChange={handleFileChange} error={error} fileData={fileData} />
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button variant="contained" color="secondary" onClick={() => navigate("/cafes")}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddEditCafe;
