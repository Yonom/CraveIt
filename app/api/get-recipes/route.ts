import generateRecipes from "./generateRecipes";
import { doImageGeneration } from "../openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

type Params = {
  ingredients: string[];
};

type Recipe = {
  name: string;
  description: string;
  imageUrl?: string;
  time?: string;
  ingredients?: { name: string; amount: string }[];
  instructions?: string[];
};

export const POST = async (request: Request) => {
  const { ingredients } = (await request.json()) as Params;
  if (!Array.isArray(ingredients) || ingredients.length < 2)
    return new Response(null, { status: 401 });

  // generate recipes
  try {
    const { recipes, diag } = await generateRecipes(ingredients);

    // generate images
    await Promise.all(
      recipes.map(async (r: Recipe) => {
        r.imageUrl = await doImageGeneration(r.description);
      })
    );

    return NextResponse.json({
      diag,
      recipes,
    });
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
