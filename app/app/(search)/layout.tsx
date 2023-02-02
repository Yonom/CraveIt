"use client";

import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, PropsWithChildren } from "react";

const SearchLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Grid2 xl={6} md={8} sm={10} xs={12} px={2}>
        {children}
      </Grid2>
    </Grid2>
  );
};

export default SearchLayout;
