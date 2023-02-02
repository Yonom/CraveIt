"use client";

import { useSearchParams } from "next/navigation";
import { use } from "react";

type Recipe = {
  name: string;
};

const getResults = async (ingredients: string[]) => {
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

const useResults = (ingredients: string[]) => {
  return use(getResultsOrCache(ingredients));
};

const Results = () => {
  const searchParams = useSearchParams();
  const ingredients = searchParams.get("q")?.split(",") ?? [];
  const { recipes } = useResults(ingredients);

  return (
    <>
      {recipes.map((r) => (
        <p>{r.name}</p>
      ))}
    </>
  );
};

export default Results;
