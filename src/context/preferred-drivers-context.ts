import { LocalStorageKeys } from "~/helpers/const";
import { useReactQueryContext } from "./baseContext";

const KEY = LocalStorageKeys.PREFERRED_DRIVERS;

export function useGetPreferredDrivers() {
  const storageValue = localStorage.getItem(KEY);

  const initialValue = storageValue?.split(",") ?? [];

  const { data, update } = useReactQueryContext<string[]>(KEY, initialValue);

  const updateValue = (value: string[]) => {
    localStorage.setItem(KEY, value.join(","));
    update(value);
  };

  return [data, updateValue] as const;
}
