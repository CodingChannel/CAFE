import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Cafe Employee Manager
        </Typography>
        <Button color="inherit" component={Link} to="/cafes">
          Cafes
        </Button>
        <Button color="inherit" component={Link} to="/employees">
          Employees
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
