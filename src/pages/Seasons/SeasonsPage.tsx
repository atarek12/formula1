import React from "react";
import { useGetSeasons } from "~/API";
import {
  ErrorMessage,
  GridOrList,
  PageLoading,
  Pagination,
} from "~/components";
import { SeasonsGrid } from "./SeasonsGrid";
import { SeasonsList } from "./SeasonsList";
import { usePagination } from "~/helpers";

interface SeasonsPageProps {}

export const SeasonsPage: React.FC<SeasonsPageProps> = () => {
  const { currentPage, limit, offset, setPage, setPageSize } = usePagination();
  const { data, isLoading, error } = useGetSeasons({ limit, offset });

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      <h1>F1 Seasons</h1>
      <Pagination
        totalItems={data?.total}
        pageSize={limit}
        currentPage={currentPage}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
      {isLoading ? (
        <PageLoading />
      ) : !data ? (
        <ErrorMessage message="No data available" />
      ) : (
        <GridOrList
          gridElement={<SeasonsGrid data={data} />}
          listElement={<SeasonsList data={data} />}
        />
      )}
    </div>
  );
};
