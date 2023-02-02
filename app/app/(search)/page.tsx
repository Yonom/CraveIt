"use client";

import {
  Autocomplete,
  Button,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const INGREDIENTS = [
  "Apples",
  "Bananas",
  "Strawberries",
  "Avocados",
  "Bell Peppers",
  "Carrot",
  "Garlic",
  "Lemons",
  "Limes",
  "Onion",
  "Parsley",
  "Cilantro",
  "Potatoes",
  "Spinach",
  "Tomatoes",
  "Breadcrumbs",
  "Pasta",
  "Quinoa",
  "Rice",
  "Wheat",
  "Bread",
  "Flour",
  "Tortillas",
  "Chicken",
  "Eggs",
  "Beef",
  "Turkey",
  "Meat",
  "Butter",
  "Sliced Cheese",
  "Shredded Cheese",
  "Milk Sour Cream",
  "Greek Yoghurt",
  "Baking Powder",
  "Baking Soda",
  "Sugar",
  "Brown Sugar",
  "Flour",
  "Honey",
  "Vanilla",
  "Dry Yeast",
  "Chocolate",
  "Chips",
  "Cocoa Powder",
  "Powdered Sugar",
  "Berries",
  "Corn",
  "Broccoli",
  "Juice",
  "Pizza",
  "Beef",
  "Chicken",
  "Bacon",
  "Shrimp",
  "Puff",
  "Pastry",
  "Cookie",
  "Dough",
  "Pie",
  "Crust",
  "Chicken",
  "Salsa",
  "Diced",
  "Jam",
  "Jelly",
  "Peanut Butter",
  "Pasta Sauce",
  "Black Beans Soups",
  "Tuna",
  "Black Pepper",
  "Chilli Powder",
  "Cinnamon",
  "Crushed Red Pepper",
  "Cumin",
  "Garlic",
  "Powder",
  "Ketchup",
  "Mustard",
  "Mayo",
  "Nutmeg",
  "Paprika",
  "Soy Sauce",
  "Steak Sauce",
  "Buffalo Sauce",
  "Salad Dressings",
  "Apple Cider",
  "Vinegar",
  "Balsamic Vinegar",
  "Coconut Oil",
  "Olive Oil",
  "Vegetable/Canola Oil",
  "Red Wine",
  "Vinegar",
  "White Vinegar",
  "Cooking Wine",
  "White Wine",
  "Crackers",
  "Nuts",
  "Quick Oats",
  "Popcorn",
  "Tortilla Chips",
  "Cereal",
  "Oats",
];

const MIN_INGREDIENTS = 2;

const InputPage = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/results?q=" + ingredients.join(","));
  };

  return (
    <Stack spacing={2}>
      <Typography sx={{ fontWeight: "bold" }}>
        Get Recipes To Cook Tonight
      </Typography>
      <Autocomplete
        multiple
        options={INGREDIENTS}
        value={ingredients}
        onChange={(event, newValue) => {
          setIngredients(newValue);
        }}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Ingredients" placeholder="Favorites" />
        )}
      />
      <Button
        variant="contained"
        disabled={ingredients.length < MIN_INGREDIENTS}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Typography variant="body2" sx={{ fontStyle: "oblique" }}>
        By Leonie, Kofi, Philipp, Johannes, Simon
      </Typography>
    </Stack>
  );
};

export default InputPage;
