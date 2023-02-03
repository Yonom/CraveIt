export const doCompletion = async (
  apiKey: string,
  prompt: string,
  temperature = 0.7
) => {
  const query = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
      Accept: "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      max_tokens: 2000,
      prompt,
      temperature,
    }),
    cf: { cacheTtl: 60 * 60 * 24 * 7, cacheEverything: true },
  });
  const { choices: [{ text }] = [{ text: "" }] } = (await query.json()) as {
    choices: { text: string }[];
  };
  return text;
};

export const doImageGeneration = async (
  apiKey: string,
  description: string
) => {
  const query = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
      Accept: "application/json",
    },
    body: JSON.stringify({
      size: "512x512",
      prompt: description,
    }),
    cf: { cacheTtl: 60 * 60 * 24 * 7, cacheEverything: true },
  });
  const {
    data: [{ url }],
  } = (await query.json()) as { data: { url: string }[] };
  return url;
};
