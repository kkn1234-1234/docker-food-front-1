import React, { useState } from "react";
import "./Food.css";
import { Link } from "react-router-dom";


const recipesData = [
  // Indian Dishes
  { id: 1, name: "Chicken Biryani", category: "Main Course", image: "/itm/1.jpg", description: "Aromatic rice dish with spices and chicken." },
  { id: 2, name: "Paneer Butter Masala", category: "Main Course", image: "/itm/2.jpg", description: "Creamy tomato-based paneer curry." },
  { id: 3, name: "Gulab Jamun", category: "Dessert", image: "/itm/3.jpg", description: "Sweet fried dumplings soaked in sugar syrup." },
  { id: 4, name: "Vada Pav", category: "Snacks", image: "/itm/4.jpg", description: "Mumbai-style spicy potato fritter in a bun." },
  { id: 5, name: "Butter Chicken", category: "Main Course", image: "/itm/5.jpg", description: "Delicious creamy butter chicken curry." },
  { id: 6, name: "Dhokla", category: "Snacks", image: "/itm/6.jpg", description: "Steamed savory cake made from rice and chickpea flour." },
  { id: 7, name: "Kheer", category: "Dessert", image: "/itm/7.jpg", description: "Indian rice pudding made with milk, rice, and cardamom." },
  { id: 8, name: "Masala Dosa", category: "Snacks", image: "/itm/8.jpg", description: "Crispy South Indian dosa stuffed with spiced potatoes." },
  { id: 9, name: "Pani Puri", category: "Snacks", image: "/itm/9.jpg", description: "Crispy puris filled with spicy and tangy water." },
  { id: 10, name: "Rajma Chawal", category: "Main Course", image: "/itm/10.jpg", description: "Kidney beans curry served with steamed rice." },

  // Italian Dishes
  { id: 11, name: "Margherita Pizza", category: "Main Course", image: "/itm/11.jpg", description: "Classic Italian pizza with tomato, mozzarella, and basil." },
  { id: 12, name: "Pasta Carbonara", category: "Main Course", image: "/itm/12.jpg", description: "Creamy pasta with eggs, cheese, pancetta, and pepper." },
  { id: 13, name: "Lasagna", category: "Main Course", image: "/itm/13.jpg", description: "Layered pasta with meat sauce, ricotta, and cheese." },
  { id: 14, name: "Tiramisu", category: "Dessert", image: "/itm/14.jpg", description: "Coffee-flavored Italian dessert with mascarpone and cocoa." },
  { id: 15, name: "Risotto", category: "Main Course", image: "/itm/15.jpg", description: "Creamy rice dish cooked with broth, butter, and cheese." },
  { id: 16, name: "Bruschetta", category: "Snacks", image: "/itm/16.jpg", description: "Grilled bread topped with tomatoes, basil, and garlic." },
  { id: 17, name: "Minestrone Soup", category: "Starter", image: "/itm/17.jpg", description: "Traditional Italian vegetable soup with pasta or rice." },
  { id: 18, name: "Blueberry Cheesecake", category: "Dessert", image: "/itm/18.jpg", description: "Creamy cheesecake layered with fresh blueberries and a buttery graham cracker crust." },
  { id: 19, name: "Panna Cotta", category: "Dessert", image: "/itm/19.jpg", description: "Creamy Italian dessert made with sweetened cream and gelatin." },
  { id: 20, name: "Caprese Salad", category: "Starter", image: "/itm/20.jpg", description: "Fresh salad with mozzarella, tomatoes, basil, and olive oil." },

  // Mexican Dishes
  { id: 21, name: "Tacos", category: "Main Course", image: "/itm/21.jpg", description: "Corn tortillas filled with meat, veggies, and salsa." },
  { id: 22, name: "Chicken Drumstick", category: "Snacks", image: "/itm/22.jpg", description: "Juicy chicken drumsticks marinated in spices and grilled to crispy perfection." },
  { id: 23, name: "Enchiladas", category: "Main Course", image: "/itm/23.jpg", description: "Rolled tortillas filled with meat and covered in sauce." },
  { id: 24, name: "Churros", category: "Dessert", image: "/itm/24.jpg", description: "Fried dough pastries coated in cinnamon sugar." },
  { id: 25, name: "Quesadilla", category: "Snacks", image: "/itm/25.jpg", description: "Grilled tortilla filled with melted cheese and veggies." },

  // Mediterranean Dishes
  { id: 26, name: "Hummus", category: "Snacks", image: "/itm/26.jpg", description: "Chickpea dip blended with tahini, lemon, and garlic." },
  { id: 27, name: "Greek Salad", category: "Starter", image: "/itm/27.jpg", description: "Salad with cucumbers, tomatoes, olives, and feta cheese." },
  { id: 28, name: "Falafel", category: "Snacks", image: "/itm/28.jpg", description: "Crispy chickpea fritters served with tahini sauce." },
  { id: 29, name: "Shawarma", category: "Main Course", image: "/itm/29.jpg", description: "Grilled marinated meat wrapped in pita bread." },
  { id: 30, name: "Baklava", category: "Dessert", image: "/itm/30.jpg", description: "Layered pastry filled with nuts and sweet syrup." }
];


const RecipeApp = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Main Course", "Dessert", "Snacks"];

  // Filtering recipes based on category and search query
  const filteredRecipes = recipesData.filter(recipe => 
    (selectedCategory === "All" || recipe.category === selectedCategory) &&
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Authentic Recipes For Modern Kitchen</h1>

      {/* Search Bar */}
      <input 
        type="text"
        placeholder="Search recipes..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map(category => (
          <button 
            key={category} 
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recipe List */}
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
              <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="MuiCard-root">
                <img src={recipe.image} alt={recipe.name} />
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
              </Link>

          ))
        ) : (
          <p className="no-results">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default RecipeApp;
