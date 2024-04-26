"use client";

import { Suspense } from "react";
import ResultsPage from "./ResultsPage";
import LoadingPage from "../common/LoadingPage";

const ResultPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ResultsPage />
    </Suspense>
  );
};

export default ResultPage;
