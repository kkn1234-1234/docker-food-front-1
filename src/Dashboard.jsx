import React from 'react';
import "./Food.css";
import FoodRecipeApp from "./FoodRecipeApp";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    // Clear session or token if stored
    localStorage.removeItem('authToken');

    // Redirect to signin page
    navigate("/");

  };

  return (
    <Container className="app-container">
      
      {/* Logout Button */}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Title */}
      <Box className="title-container">
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom  
          sx={{ fontFamily: "'Brush Script MT', cursive", fontWeight: 700 }}
        >
          The World Of Recipes  
        </Typography>
        <img 
          className="recipe-image" 
          src="/itm/icon.jpg" 
          alt="Food" 
        />
      </Box>

      {/* Recipes */}
      <FoodRecipeApp />
    </Container>
  );
};

export default Dashboard;
