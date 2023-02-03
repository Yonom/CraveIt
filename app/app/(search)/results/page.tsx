"use client";

import { Suspense } from "react";
import Results from "./ResultsPage";
import LoadingPage from "./LoadingPage";

const ResultPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Results />
      </Suspense>
    </>
  );
};

export default ResultPage;
