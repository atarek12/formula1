import { useQuery } from "@tanstack/react-query";
import { baseFetch } from "./baseFetch";
import type {
  TApiResponse,
  TPaginationRequest,
  TPaginationResponse,
  TSeason,
} from "./api.types";

export interface IGetSeasonsRequest extends TPaginationRequest {}

export interface IGetSeasonsResponse extends TApiResponse, TPaginationResponse {
  SeasonTable: { Seasons: TSeason[] };
}

export const useGetSeasons = (params: IGetSeasonsRequest = {}) => {
  const { limit = 30, offset = 0 } = params;

  return useQuery<IGetSeasonsResponse>({
    queryKey: ["seasons", limit, offset],
    queryFn: () =>
      baseFetch<IGetSeasonsResponse>(
        `seasons.json?limit=${limit}&offset=${offset}`,
      ),
  });
};
