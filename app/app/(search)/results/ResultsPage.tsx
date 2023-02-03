"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useResults } from "./backend/useResults";

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const ingredients = searchParams.get("q")?.split(",") ?? [];
  const { recipes } = useResults(ingredients);
  const router = useRouter();

  return (
    <Stack spacing={2}>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        Your recipes are ready to go 😋
      </Typography>
      {recipes.map((r) => {
        const handleRecipeClick = () => {
          router.push(
            "/detail?q=" +
              encodeURIComponent(ingredients.join(",")) +
              "&name=" +
              encodeURIComponent(r.name) +
              "&description=" +
              encodeURIComponent(r.description) +
              "&imageUrl=" +
              encodeURIComponent(r.imageUrl)
          );
        };

        return (
          <Box pb={1} key={r.name}>
            <Card>
              <CardActionArea onClick={handleRecipeClick}>
                <Stack key={r.name}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={r.imageUrl}
                    alt={r.name}
                  />
                  <CardContent>
                    <Typography variant="h5">{r.name}</Typography>
                  </CardContent>
                </Stack>
              </CardActionArea>
            </Card>
          </Box>
        );
      })}
    </Stack>
  );
};

export default ResultsPage;
