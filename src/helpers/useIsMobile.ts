import { useMediaQuery } from "usehooks-ts";
import { MobileMediaQuery } from "./const";

export function useIsMobile() {
  const isMobile = useMediaQuery(MobileMediaQuery);
  return isMobile;
}
