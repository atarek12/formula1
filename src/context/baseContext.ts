import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

type TUpdaterCallback<T> = (prev: T) => T;
type TUpdater<T> = T | TUpdaterCallback<T>;

export function useReactQueryContext<T>(key: string, initial?: T) {
  const KEY = [key];
  const queryClient = useQueryClient();

  const { data = initial } = useQuery({
    queryKey: KEY,
    queryFn: () => queryClient.getQueryData<T>(KEY),
    staleTime: Infinity,
  });

  const { mutate } = useMutation<T, Error, T>({
    mutationFn: async (variables) =>
      queryClient.setQueryData(KEY, variables) as T,
  });

  const update = useCallback(
    (updater: TUpdater<T>) => {
      const value =
        typeof updater === "function"
          ? (updater as TUpdaterCallback<T>)(data as T)
          : updater;
      mutate(value);
    },

    [mutate, data],
  );

  useEffect(() => {
    if (!data && initial) {
      update(initial);
    }
  }, [data, initial, update]);

  return { data: data as T, update };
}
