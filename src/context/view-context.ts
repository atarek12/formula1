import { useReactQueryContext } from "./baseContext";

export const ViewEnum = {
  LIST: "LIST",
  GRID: "GRID",
} as const;

export type ViewEnum = (typeof ViewEnum)[keyof typeof ViewEnum];

export const useViewContext = () => {
  const storageValue = localStorage.getItem(
    "PREFERRED_VIEW",
  ) as ViewEnum | null;
  const isValidValue = Object.values(ViewEnum).includes(
    storageValue as ViewEnum,
  );
  const initialValue = isValidValue
    ? (storageValue as ViewEnum)
    : ViewEnum.LIST;

  const { data, update } = useReactQueryContext<ViewEnum | undefined>(
    "PREFERRED_VIEW",
    initialValue,
  );

  const updateValue = (value: ViewEnum) => {
    localStorage.setItem("PREFERRED_VIEW", value);
    update(value);
  };

  return [data, updateValue] as const;
};
