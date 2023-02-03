"use client";

import { use } from "react";
import testResult from "./testResult.json";

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
  // TODO temp
  // return testResult.details;

  const res = await fetch("https://get-recipe-details.yonom.workers.dev", {
    method: "POST",
    body: JSON.stringify({
      key: "MLp01puIMCItAbGio0Wg",
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
