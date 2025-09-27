import React from "react";
import { Container, Typography, Box } from "@mui/material";
import FoodRecipeApp from "./FoodRecipeApp";
import "./Food.css"; // Make sure you import the CSS file

const App = () => {
  return (
    <Container className="app-container">
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
      <FoodRecipeApp />
    </Container>
  );
};

export default App;
