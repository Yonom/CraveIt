import { doCompletion } from "./openai";

const generateRecipes = async (apiKey: string, ingredients: string[]) => {
  const NUM_SUGGESTIONS = 5;
  const prompt = `I have at home the following ingredients:

Base Ingredients: Salt, Pepper, Curry, sugar, cinnamon, Olive Oil, Sunflower Oil, Butter, Garlic, Onion, Vinegar

Main Ingredients: ${ingredients.join(", ")}

The available kitchen equipment is basic.

Give me the name and description of ${
    NUM_SUGGESTIONS + 1
  } different recipies that contain only the ingredients mentioned above.

The Description should not contain one of the base ingredients mentioned above and should not be longer than 6 words. Don't show anything else than name and description.

###

Name: Ham and Egg Pasta
Description: Pasta Dish with ham and Egg

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
