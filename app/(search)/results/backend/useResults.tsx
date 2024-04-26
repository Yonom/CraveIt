"use client";

import { use } from "react";

export type Recipe = {
  name: string;
  description: string;
  imageUrl: string;
};

const getResults = async (ingredients: string[]) => {
  const res = await fetch("/api/get-recipes", {
    method: "POST",
    body: JSON.stringify({
      ingredients,
    }),
  });

  const response = (await res.json()) as {
    recipes: Recipe[];
  };
  return response;
};

const resultCache = {} as Record<string, ReturnType<typeof getResults>>;
const getResultsOrCache = (ingredients: string[]) => {
  const key = ingredients.join(",");
  if (key in resultCache) {
    return resultCache[key];
  }
  const res = getResults(ingredients);
  resultCache[key] = res;
  return res;
};

export const useResults = (ingredients: string[]) => {
  return use(getResultsOrCache(ingredients));
};
