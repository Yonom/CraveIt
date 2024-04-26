"use client";

import { use } from "react";

type InputRecipe = {
  name: string;
  description: string;
};

type RecipeDetails = {
  time: string;
  ingredients: { name: string; amount: string }[];
  instructions: string[];
};

const getDetails = async (ingredients: string[], recipe: InputRecipe) => {
  const res = await fetch("/api/get-recipe-details", {
    method: "POST",
    body: JSON.stringify({
      ingredients,
      recipe,
    }),
  });

  const response = (await res.json()) as { details?: RecipeDetails };
  return response.details;
};

const detailCache = {} as Record<string, ReturnType<typeof getDetails>>;
const getDetailsOrCache = (ingredients: string[], recipe: InputRecipe) => {
  const key =
    ingredients.join(",") + "," + recipe.name + "," + recipe.description;
  if (key in detailCache) {
    return detailCache[key];
  }
  const res = getDetails(ingredients, recipe);
  detailCache[key] = res;
  return res;
};

export const useDetails = (ingredients: string[], recipe: InputRecipe) => {
  return use(getDetailsOrCache(ingredients, recipe));
};
