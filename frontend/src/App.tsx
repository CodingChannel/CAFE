import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cafes from "./pages/Cafes";
import Employees from "./pages/Employees";
import NavBar from "./components/NavBar";
import AddEditEmployee from "./components/EmployeeForm";
import AddEditCafe from "./components/CafeForm";

function App() {
  return (
    /*
    TODO: Write tests for validations
    */
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Cafes />} />
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/cafes" element={<Cafes />} />
        <Route path="/cafes/add" element={<AddEditCafe />} />
        <Route path="/cafes/:id" element={<AddEditCafe />} />

        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEditEmployee />} />
        <Route path="/employees/:id" element={<AddEditEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
