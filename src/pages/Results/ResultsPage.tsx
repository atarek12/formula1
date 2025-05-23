import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetRaceResults } from "~/API";
import {
  ErrorMessage,
  GridOrList,
  PageLoading,
  Pagination,
} from "~/components";
import { usePagination } from "~/helpers";
import { ResultsGrid } from "./ResultsGrid";
import { ResultsList } from "./ResultsList";
import { DriversSelector } from "./DriversSelector";
import { makeStyles } from "@fluentui/react-components";
import { useGetPreferredDrivers } from "~/context";

const useStyles = makeStyles({
  filters: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

interface ResultsPageProps {}

export const ResultsPage: React.FC<ResultsPageProps> = ({}) => {
  const styles = useStyles();
  const { currentPage, limit, offset, setPage, setPageSize } = usePagination();
  const params = useParams();
  const season = params.seasonId || "";
  const round = params.roundId || "";
  const { data, isLoading, error } = useGetRaceResults({
    limit,
    offset,
    season,
    round,
  });
  const [preferredDrivers, setPreferredDrivers] = useGetPreferredDrivers();

  const drivers = useMemo(() => {
    if (!data) return [];
    return data?.RaceTable.Races[0].Results.map((r) => r.Driver);
  }, [data]);

  const onSelectedDriversChange = (selectedDrivers: string[]) => {
    setPreferredDrivers(selectedDrivers);
  };

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div>
      <h1>Race Results</h1>
      <div className={styles.filters}>
        <Pagination
          totalItems={data?.total}
          pageSize={limit}
          currentPage={currentPage}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
        />
        <DriversSelector
          drivers={drivers}
          selectedDriverIds={preferredDrivers}
          onSelectedDriverIdsChange={onSelectedDriversChange}
        />
      </div>
      {isLoading ? (
        <PageLoading />
      ) : !data ? (
        <ErrorMessage message="No data available" />
      ) : (
        <GridOrList
          gridElement={<ResultsGrid data={data} />}
          listElement={<ResultsList data={data} />}
        />
      )}
    </div>
  );
};
