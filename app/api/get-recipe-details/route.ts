import { NextResponse } from "next/server";
import generateDetails from "./generateDetails";

export const runtime = "edge";

type Params = {
  key: string;
  ingredients: string[];
  recipe: {
    name: string;
    description: string;
  };
};

export const POST = async (request: Request) => {
  const { recipe, ingredients } = (await request.json()) as Params;
  if (
    !Array.isArray(ingredients) ||
    typeof recipe !== "object" ||
    !recipe.name ||
    ingredients.length < 2
  )
    return new Response(null, { status: 401 });

  try {
    // cooking instructions
    const result = await generateDetails(ingredients, recipe);

    return NextResponse.json(result);
  } catch (ex: unknown) {
    return NextResponse.json(
      {
        errName: (ex as Error).name,
        errMessage: (ex as Error).message,
        errStack: (ex as Error).stack,
      },
      {
        status: 500,
      }
    );
  }
};
