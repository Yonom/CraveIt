"use client";

import { Stack, Typography } from "@mui/material";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import animation from "./loadingAnimation.json";

const TEXTS = [
  "Cooking up recipes",
  "Searching the web",
  "Asking grandmas",
  "Calling Chef Ramsey",
  "Stealing the Krusty Krab secret formula",
  "Giving you time to get your taste buds ready",
  "Unlocking your inner chef",
  "Discovering exotic cuisines",
  "Brainstorming delicious creations",
  "Reinventing classic recipes",
];

const LoadingPage = () => {
  const [textIndex, setTextIndex] = useState(0);
  useEffect(() => {
    const handle = setInterval(() => {
      setTextIndex((i) => (i + 1) % TEXTS.length);
    }, 3000);

    return () => {
      clearInterval(handle);
    };
  }, []);
  return (
    <Stack alignItems={"center"}>
      <Lottie
        animationData={animation}
        style={{ width: 300, height: 300 }}
        loop={true}
      />
      <Typography>{TEXTS[textIndex]}...</Typography>
    </Stack>
  );
};

export default LoadingPage;
