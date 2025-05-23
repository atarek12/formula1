import { LocalStorageKeys } from "~/helpers/const";
import { useReactQueryContext } from "./baseContext";

const KEY = LocalStorageKeys.PREFERRED_VIEW;

export const ViewEnum = {
  LIST: "LIST",
  GRID: "GRID",
} as const;

export type ViewEnum = (typeof ViewEnum)[keyof typeof ViewEnum];

export const useViewContext = () => {
  const storageValue = localStorage.getItem(KEY) as ViewEnum | null;
  const isValidValue = Object.values(ViewEnum).includes(
    storageValue as ViewEnum,
  );
  const initialValue = isValidValue
    ? (storageValue as ViewEnum)
    : ViewEnum.LIST;

  const { data, update } = useReactQueryContext<ViewEnum | undefined>(
    KEY,
    initialValue,
  );

  const updateValue = (value: ViewEnum) => {
    localStorage.setItem(KEY, value);
    update(value);
  };

  return [data, updateValue] as const;
};
