import { useEffect, useRef, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const debouncedValue = useRef(value);
  const [, refresh] = useState({});

  if (!value) {
    debouncedValue.current = value;
  }

  useEffect(() => {
    if (!value) return undefined;

    const timer = setTimeout(() => {
      debouncedValue.current = value;
      refresh({});
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue.current;
}

export default useDebounce;
