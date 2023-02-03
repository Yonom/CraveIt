"use client";

import { Box, Card, CardContent } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, PropsWithChildren } from "react";
import image from "./background-image.jpeg";
import image_logo from "./logo-small.png";

const SearchLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Grid2
      container
      justifyContent="center"
      minHeight="100vh"
      sx={{
        // backgroundImage: "url(" + image.src + ")"
        backgroundColor: "D7D7D7",
      }}
      p={2}
    >
      <Grid2 maxWidth={500}>
        <Box display="flex" justifyContent="center" py={2}>
          <img src={image_logo.src} style={{ maxWidth: "50%" }} />
        </Box>
        <Card elevation={0}>
          <CardContent>{children}</CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default SearchLayout;
