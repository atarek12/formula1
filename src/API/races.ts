import { useQuery } from "@tanstack/react-query";
import { baseFetch } from "./baseFetch";
import type {
  TApiResponse,
  TPaginationRequest,
  TPaginationResponse,
  TRace,
} from "./api.types";

export interface IGetSeasonRacesRequest extends TPaginationRequest {
  /* The season year. */
  season: string;
}

export interface IGetSeasonRacesResponse
  extends TApiResponse,
    TPaginationResponse {
  RaceTable: { Races: TRace[]; season: string };
}

export const useGetSeasonRaces = (params: IGetSeasonRacesRequest) => {
  const { season, limit = 30, offset = 0 } = params;

  return useQuery<IGetSeasonRacesResponse>({
    queryKey: ["seasons", season, limit, offset],
    enabled: !!season,
    queryFn: () =>
      baseFetch<IGetSeasonRacesResponse>(
        `${season}/races.json?limit=${limit}&offset=${offset}`,
      ),
  });
};
