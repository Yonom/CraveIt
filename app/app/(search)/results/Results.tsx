"use client";

import { useSearchParams } from "next/navigation";

const useResults = () => {
  throw new Promise((a) => {});
};

const Results = () => {
  const searchParams = useSearchParams();
  const results = useResults();

  return <></>;
};

export default Results;
