import { useMemo } from "react";
import type { IGetSeasonRacesResponse, TRace } from "~/API";
import { useGetPinnedRaces } from "~/context";

export function useGetSortedRaces(
  data: IGetSeasonRacesResponse | undefined,
): IGetSeasonRacesResponse | undefined {
  const [pinnedRaces] = useGetPinnedRaces(data?.RaceTable.season || "-1");

  const sortedData = useMemo(() => {
    if (!data?.RaceTable.Races) return [];

    const pinnedRacesSet = new Set(pinnedRaces);
    const pinnedItems: TRace[] = [];
    const unpinnedItems: TRace[] = [];

    data?.RaceTable.Races.forEach((item) => {
      if (pinnedRacesSet.has(item.round)) {
        pinnedItems.push(item);
      } else {
        unpinnedItems.push(item);
      }
    });
    return [...pinnedItems, ...unpinnedItems];
  }, [data?.RaceTable.Races, pinnedRaces]);

  if (!data) return undefined;

  return { ...data, RaceTable: { ...data.RaceTable, Races: sortedData } };
}
