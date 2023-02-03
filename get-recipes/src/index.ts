import generateRecipes from "./generateRecipes";
import { doImageGeneration } from "./openai";

type Env = {
  OPENAI_API_KEY: string; // API key to access OPENAI
  API_KEY: string; // our own API key
};

type Params = {
  ingredients: string[];
  key: string;
};

type Recipe = {
  name: string;
  description: string;
  imageUrl?: string;
  time?: string;
  ingredients?: { name: string; amount: string }[];
  instructions?: string[];
};

const allowedOrigins = ["http://localhost:3000", "https://craveit.vercel.app"];

const invalidRequest = () => {
  return new Response(null, {
    status: 401,
    headers: {
      Vary: "Origin",
    },
  });
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") return invalidRequest();

    const origin = request.headers.get("Origin") ?? "";
    if (!allowedOrigins.includes(origin)) return invalidRequest();

    const { ingredients, key } = (await request.json()) as Params;
    if (
      key !== env.API_KEY ||
      !Array.isArray(ingredients) ||
      ingredients.length < 2
    )
      return invalidRequest();

    // generate recipes
    try {
      const { recipes, diag } = await generateRecipes(
        env.OPENAI_API_KEY,
        ingredients
      );

      // generate images
      await Promise.all(
        recipes.map(async (r: Recipe) => {
          r.imageUrl = await doImageGeneration(
            env.OPENAI_API_KEY,
            r.description
          );
        })
      );

      return new Response(
        JSON.stringify({
          diag,
          recipes,
        }),
        {
          headers: {
            "Access-Control-Allow-Origin": origin,
            Vary: "Origin",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    } catch (ex: unknown) {
      return new Response(
        JSON.stringify({
          errName: (ex as Error).name,
          errMessage: (ex as Error).message,
          errStack: (ex as Error).stack,
        }),
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": origin,
            Vary: "Origin",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
    }
  },
};
