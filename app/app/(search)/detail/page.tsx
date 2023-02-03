"use client";

import { Suspense } from "react";
import RecipeDetailPage from "./RecipeDetailPage";
import LoadingPage from "../common/LoadingPage";

const DetailPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RecipeDetailPage />
    </Suspense>
  );
};

export default DetailPage;
