import generateDetails from "./generateDetails";

type Env = {
  OPENAI_API_KEY: string; // API key to access OPENAI
  API_KEY: string; // our own API key
};

type Params = {
  key: string;
  ingredients: string[];
  recipe: {
    name: string;
    description: string;
  };
};

const allowedOrigins = ["http://localhost:3000", "https://craveit.vercel.app/"];

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

    const { recipe, ingredients, key } = (await request.json()) as Params;
    if (
      key !== env.API_KEY ||
      !Array.isArray(ingredients) ||
      typeof recipe !== "object" ||
      !recipe.name ||
      ingredients.length < 2
    )
      return invalidRequest();

    try {
      // cooking instructions
      const result = await generateDetails(
        env.OPENAI_API_KEY,
        ingredients,
        recipe
      );

      return new Response(JSON.stringify(result), {
        headers: {
          "Access-Control-Allow-Origin": origin,
          Vary: "Origin",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
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
