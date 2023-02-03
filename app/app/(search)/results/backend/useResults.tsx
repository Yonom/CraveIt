"use client";

import { use } from "react";
import testResult from "./testResult.json";

export type Recipe = {
  name: string;
  description: string;
  imageUrl: string;
};

const getResults = async (ingredients: string[]) => {
  // await new Promise<void>((r) => {
  //   setTimeout(() => r(), 3000);
  // });
  // return testResult;

  const res = await fetch("https://get-recipes.yonom.workers.dev", {
    method: "POST",
    body: JSON.stringify({
      key: "MLp01puIMCItAbGio0Wg",
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
