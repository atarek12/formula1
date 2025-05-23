import { useQuery } from "@tanstack/react-query";
import { baseFetch } from "./baseFetch";
import type {
  TApiResponse,
  TPaginationRequest,
  TPaginationResponse,
  TRaceResults,
} from "./api.types";

export interface IGetRaceResultsRequest extends TPaginationRequest {
  /* The season year. */
  season: string;
  /* The round number. */
  round: string;
}

export interface IGetRaceResultsResponse
  extends TApiResponse,
    TPaginationResponse {
  RaceTable: { Races: TRaceResults[]; season: string; round: string };
}

export const useGetRaceResults = (params: IGetRaceResultsRequest) => {
  const { season, round, limit = 30, offset = 0 } = params;

  return useQuery<IGetRaceResultsResponse>({
    queryKey: ["results", season, round, limit, offset],
    enabled: !!season && !!round,
    queryFn: () =>
      baseFetch<IGetRaceResultsResponse>(
        `${season}/${round}/results.json?limit=${limit}&offset=${offset}`,
      ),
  });
};
