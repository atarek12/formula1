import React from "react";
import type { IGetSeasonsResponse, TSeason } from "~/API";
import {
  createTableColumn,
  Link,
  Tooltip,
  type TableColumnDefinition,
} from "@fluentui/react-components";
import { FluentLink, Table, ButtonLink } from "~/components";
import { ArrowRightRegular, WindowNewRegular } from "@fluentui/react-icons";
import { getRacesLink } from "~/helpers/utils";

interface SeasonsListProps {
  data: IGetSeasonsResponse;
}

export const SeasonsList: React.FC<SeasonsListProps> = ({ data }) => {
  const columns: TableColumnDefinition<TSeason>[] = [
    createTableColumn({
      columnId: "season",
      renderHeaderCell: () => "Season",
      renderCell: (item) => (
        <Tooltip
          content={`View Races for ${item.season} season`}
          relationship="description"
        >
          <FluentLink to={getRacesLink(item.season)}>{item.season}</FluentLink>
        </Tooltip>
      ),
    }),
    createTableColumn({
      columnId: "wiki",
      renderHeaderCell: () => "Wikipedia",
      renderCell: (item) => (
        <Link href={item.url} target="_blank" rel="noopener noreferrer">
          Wikipedia Documentation <WindowNewRegular />
        </Link>
      ),
    }),
    createTableColumn({
      columnId: "actions",
      renderHeaderCell: () => null,
      renderCell: (item) => (
        <ButtonLink
          iconPosition="after"
          icon={<ArrowRightRegular />}
          to={getRacesLink(item.season)}
        >
          View Races
        </ButtonLink>
      ),
    }),
  ];

  return <Table rows={data.SeasonTable.Seasons} columns={columns} />;
};
