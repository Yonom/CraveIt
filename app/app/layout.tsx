"use client";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { NextAppDirEmotionCacheProvider } from "./mui/emotionCache";
import theme from "./mui/theme";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
      </body>
    </html>
  );
}
