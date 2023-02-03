import { doCompletion } from "./openai";

type Recipe = {
  name: string;
  description: string;
};

const generateInstructions = async (
  apiKey: string,
  ingredients: string[],
  recipe: Recipe
) => {
  const prompt = `Give me the recipe containing only the following side ingredients and main ingredients based on the name and description below:

side ingredients: """Salt, Pepper, Curry, sugar, cinnamon, Olive Oil, Sunflower Oil, Butter, Garlic, Onion, Vinegar"""

main ingredients: """${ingredients.join(", ")}"""

Name: """${recipe.name}"""
Description: """${recipe.description}"""

The available kitchen equipment is basic.

The structure should be similar to the below:

###

Ham and Egg Pasta

Time: 30min

Ingredients:

- cooked pasta /  4 cups
- diced ham / 1 cup
- eggs / 4 
- butter / 2 tablespoons
- all-purpose flour / 2 tablespoons
- milk / 1 cup
- Salt and pepper / to taste

Instructions:

1. Cook the pasta according to package instructions and set aside.

2. In a large skillet over medium heat, add the butter and ham. Cook for about 5 minutes, stirring occasionally, until the ham is lightly browned.

3. Add the flour and whisk for about 2 minutes.

4. Slowly pour in the milk, whisking constantly until the mixture is smooth and creamy.

5. Add the eggs, one at a time, whisking until the eggs are fully incorporated.

6. Add the cooked pasta to the skillet and toss to coat.

7. Season with salt and pepper, to taste.

8. Serve warm. Enjoy!

###`;

  const completion = await doCompletion(apiKey, prompt);

  const match = completion
    .trim()
    .replace(/[^\S\r\n]*\n[^\S\r\n]*/g, "\n")
    .match(
      /Time: (?<time>.+?)\n+Ingredients:\n\n(?<ingredients>(?:- .+\n?)+)\nInstructions:\n{2,}(?<instructions>(?:.+\n*)+)$/
    )?.groups as
    | {
        time: string;
        ingredients: string;
        instructions: string;
      }
    | undefined;
  if (!match)
    return {
      diag: {
        prompt,
        completion,
      },
    };

  return {
    diag: {
      prompt,
      completion,
    },
    time: match.time,
    ingredients: [
      ...match.ingredients.matchAll(/^- (?<name>.+?)(?: \/ (?<amount>.+))?$/gm),
    ]
      .map((a) => a.groups as { name: string; amount: string })
      .filter((a) => a && a.name)
      .map((a) => ({
        name: a.name.trim(),
        amount: a.amount.trim(),
      })),
    instructions: match.instructions
      .split("\n\n")
      .map((i) =>
        i
          .trim()
          .replace(/^[0-9]+\. /, "")
          .trim()
      )
      .filter((i) => i),
  };
};

export default generateInstructions;
