"use client";

import { Card, CardContent } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, PropsWithChildren } from "react";
import image from './background-image.jpeg'

const SearchLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{
        // backgroundImage: "url(" + image.src + ")"
        backgroundColor: "D7D7D7"
      }}
    >
      <Grid2 xl={6} md={8} sm={10} xs={12} p={2}>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default SearchLayout;
