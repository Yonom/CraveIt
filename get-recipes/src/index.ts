declare global {
  const OPENAI_API_KEY: string;
}

interface Env {
  OPENAI_API_KEY: string;
}

const allowedOrigins = [
  "http://localhost:3000",
  "https://antler-recipe-finder.vercel.app",
];

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

    const { ingredients, key } = (await request.json()) as {
      ingredients: string[];
      key: string;
    };
    if (key !== "MLp01puIMCItAbGio0Wg") return invalidRequest();
    if (!Array.isArray(ingredients) || ingredients.length < 2)
      return invalidRequest();

    // const query = await fetch("https://api.openai.com/v1/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + env.OPENAI_API_KEY,
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({
    //     model: "text-davinci-003",
    //     input,
    //   }),
    //   cf: { cacheTtl: 60 * 60 * 24 * 7, cacheEverything: true },
    // });
    // const res = await query.json();

    return new Response(
      JSON.stringify({
        recipes: [
          {
            name: "Test",
          },
        ],
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": origin,
          Vary: "Origin",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
  },
};
