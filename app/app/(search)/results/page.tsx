"use client";

import { Suspense } from "react";
import Lottie from "lottie-react";
import animation from "./animation.json";
import Results from "./Results";

const ResultPage = () => {
  return (
    <>
      <Suspense
        fallback={
          <Lottie
            animationData={animation}
            style={{ width: 300, height: 300 }}
            loop={true}
          />
        }
      >
        <Results />
      </Suspense>
    </>
  );
};

export default ResultPage;
