import { doCompletion } from "./openai";

const generateRecipes = async (apiKey: string, ingredients: string[]) => {
  const NUM_SUGGESTIONS = 5;
  const prompt = `Give me the name and description of ${
  NUM_SUGGESTIONS + 1
} different recipes containing only the following side ingredients and main ingredients:

side ingredients: """Salt, Pepper, Curry, sugar, cinnamon, Olive Oil, Sunflower Oil, Butter, Garlic, Onion, Vinegar"""

main ingredients: """${ingredients.join(", ")}"""

Each recipe should include at least 1 main ingredient.

The available kitchen equipment is basic.

The description should describe the dish in less than 6 words and will be used to generate a recipe picture with DALL-E (DALL-E is a text to image ML model). 

Don't show anything else than name and description.

The structure must match the one below (do not include enumeration):

###

Name: Ham and Egg Pasta
Description: Delicious Pasta Dish with Ham and Egg

###

`;

  const completion = await doCompletion(apiKey, prompt);

  return {
    diag: {
      prompt,
      completion,
    },
    recipes: completion
      .split("###")
      .map(
        (r) =>
          (r.trim() + "\n").match(
            /Name: (?<name>.*?)\n+Description: (?<description>.*?)\n/
          )?.groups as { name: string; description: string }
      )
      .filter((g) => g && g.name && g.description),
  };
};

export default generateRecipes;
