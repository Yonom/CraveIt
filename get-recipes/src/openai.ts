export const doCompletion = async (
  apiKey: string,
  prompt: string,
  temperature = 0.7
) => {
  const query = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
      Accept: "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
      temperature,
    }),
    cf: { cacheTtl: 60 * 60 * 24 * 7, cacheEverything: true },
  });
  const {
    choices: [
      {
        message: { content },
      },
    ] = [{ message: { content: "" } }],
  } = (await query.json()) as {
    choices: { message: { content: string } }[];
  };
  return content;
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
