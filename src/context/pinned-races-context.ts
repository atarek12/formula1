import { useReactQueryContext } from "./baseContext";

export function useGetPinnedRaces(season: string) {
  const KEY = `PINNED_RACES_${season}`;

  const storageValue = localStorage.getItem(KEY);

  const initialValue = storageValue?.split(",") ?? [];

  const { data, update } = useReactQueryContext<string[]>(KEY, initialValue);

  const updateValue = (value: string[]) => {
    localStorage.setItem(KEY, value.join(","));
    update(value);
  };

  return [data, updateValue] as const;
}
