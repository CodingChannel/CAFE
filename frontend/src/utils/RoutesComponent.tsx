// src/RoutesComponent.tsx

import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddEditCafe from "../components/CafeForm";
import AddEditEmployee from "../components/EmployeeForm";
import Cafes from "../pages/Cafes";
import Employees from "../pages/Employees";

const RoutesComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Cafes />} />
      <Route path="/cafes" element={<Cafes />} />
      <Route path="/cafes/add" element={<AddEditCafe />} />
      <Route path="/cafes/:id" element={<AddEditCafe />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/add" element={<AddEditEmployee />} />
      <Route path="/employees/:id" element={<AddEditEmployee />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RoutesComponent;
