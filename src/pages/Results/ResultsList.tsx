import {
  createTableColumn,
  type TableColumnDefinition,
} from "@fluentui/react-components";
import React from "react";
import type { IGetRaceResultsResponse, TResult } from "~/API";
import { Table } from "~/components";
import { getDriverFullName } from "~/helpers";

interface ResultsListProps {
  data: IGetRaceResultsResponse;
}

export const ResultsList: React.FC<ResultsListProps> = ({ data }) => {
  const columns: TableColumnDefinition<TResult>[] = [
    createTableColumn({
      columnId: "name",
      renderHeaderCell: () => "Name",
      renderCell: (item) => getDriverFullName(item.Driver),
    }),
    createTableColumn({
      columnId: "nationality",
      renderHeaderCell: () => "Nationality",
      renderCell: (item) => item.Driver.nationality,
    }),
    createTableColumn({
      columnId: "team",
      renderHeaderCell: () => "Team",
      renderCell: (item) => item.Constructor.name,
    }),
    createTableColumn({
      columnId: "position",
      renderHeaderCell: () => "Position",
      renderCell: (item) => item.position,
    }),
  ];

  return <Table rows={data.RaceTable.Races[0].Results} columns={columns} />;
};
