"use client";

import { useSearchParams } from "next/navigation";
import { useResults } from "./backend/useResults";

const Results = () => {
  const searchParams = useSearchParams();
  const ingredients = searchParams.get("q")?.split(",") ?? [];
  const { recipes } = useResults(ingredients);

  return (
    <>
      {recipes.map((r) => (
        <>
          <p>{r.name}</p>
          <img
            src={r.imageUrl}
            style={{
              borderRadius: 10,
            }}
          />
        </>
      ))}
    </>
  );
};

export default Results;
