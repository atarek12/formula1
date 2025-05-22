import { useReactQueryContext } from "./baseContext";

const KEY = "PINNED_RACES";

export function useGetPinnedRaces() {
  const storageValue = localStorage.getItem(KEY);

  const initialValue = storageValue?.split(",") ?? [];

  const { data, update } = useReactQueryContext<string[]>(KEY, initialValue);

  const updateValue = (value: string[]) => {
    localStorage.setItem(KEY, value.join(","));
    update(value);
  };

  return [data, updateValue] as const;
}
