import { LocalStorageKeys } from "~/helpers/const";
import { useReactQueryContext } from "./baseContext";

const KEY_PREFIX = LocalStorageKeys.PREFERRED_RACES_;

export function useGetPreferredRaces(season: string) {
  const KEY = `${KEY_PREFIX}${season}`;

  const storageValue = localStorage.getItem(KEY);

  const initialValue = storageValue?.split(",") ?? [];

  const { data, update } = useReactQueryContext<string[]>(KEY, initialValue);

  const updateValue = (value: string[]) => {
    localStorage.setItem(KEY, value.join(","));
    update(value);
  };

  return [data, updateValue] as const;
}
