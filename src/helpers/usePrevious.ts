import { useEffect, useRef } from "react";

export function usePrevious<T>(newValue: T): T | null {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = newValue;
  }, [newValue]);

  return ref.current;
}
