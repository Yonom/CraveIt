export const doCompletion = async (prompt: string, temperature = 0.7) => {
  const query = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
      Accept: "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
      temperature,
    }),
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

export const doImageGeneration = async (description: string) => {
  const query = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      size: "1024x1024",
      n: 1,
      prompt: description,
    }),
  });
  const {
    data: [{ url }],
  } = (await query.json()) as { data: { url: string }[] };
  return url;
};
