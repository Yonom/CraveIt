"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useDetails } from "./backend/useDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DetailPage = () => {
  const searchParams = useSearchParams();
  const inputIngredients = searchParams.get("q")?.split(",") ?? [];
  const name = searchParams.get("name") ?? "";
  const description = searchParams.get("description") ?? "";
  const imageUrl = searchParams.get("imageUrl") ?? "";
  const { time, ingredients, instructions } =
    useDetails(inputIngredients, {
      name,
      description,
    }) ?? {};

  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Stack>
      <Box>
        <IconButton edge="start" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={1}
        pb={2}
      >
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography>{time}</Typography>
      </Box>

      <img src={imageUrl} style={{ borderRadius: 8 }} />

      <Typography sx={{ fontWeight: "bold" }} pt={3} pb={1}>
        Ingredients
      </Typography>
      {ingredients?.map((i) => (
        <Box key={i.name} display="flex" justifyContent="space-between">
          <Typography>{i.name}</Typography>
          <Typography>{i.amount}</Typography>
        </Box>
      ))}
      <Typography sx={{ fontWeight: "bold" }} pt={3} pb={1}>
        Instructions
      </Typography>
      {instructions?.map((i, idx) => (
        <span key={i}>
          {idx + 1}. {i}
        </span>
      ))}
    </Stack>
  );
};

export default DetailPage;
