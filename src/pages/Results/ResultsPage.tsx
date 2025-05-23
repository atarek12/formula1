import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useGetRaceResults } from "~/API";
import { ErrorMessage, GridOrList, PageLoading } from "~/components";
import { ResultsGrid } from "./ResultsGrid";
import { ResultsList } from "./ResultsList";
import { DriversSelector } from "./DriversSelector";
import { useGetPreferredDrivers } from "~/context";
import { ResultsChart } from "./ResultsChart";

interface ResultsPageProps {}

export const ResultsPage: React.FC<ResultsPageProps> = ({}) => {
  const params = useParams();
  const season = params.seasonId || "";
  const round = params.roundId || "";
  const { data, isLoading, error } = useGetRaceResults({
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
      <DriversSelector
        drivers={drivers}
        selectedDriverIds={preferredDrivers}
        onSelectedDriverIdsChange={onSelectedDriversChange}
      />
      {isLoading ? (
        <PageLoading />
      ) : !data ? (
        <ErrorMessage message="No data available" />
      ) : (
        <>
          <GridOrList
            gridElement={<ResultsGrid data={data} />}
            listElement={<ResultsList data={data} />}
          />
          <ResultsChart results={data.RaceTable.Races[0].Results} />
        </>
      )}
    </div>
  );
};
