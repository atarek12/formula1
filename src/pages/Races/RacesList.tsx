import {
  ToggleButton,
  createTableColumn,
  Tooltip,
  type TableColumnDefinition,
} from "@fluentui/react-components";
import {
  ArrowRightRegular,
  PinFilled,
  PinRegular,
} from "@fluentui/react-icons";
import React from "react";
import type { IGetSeasonRacesResponse, TRace } from "~/API";
import { ButtonLink, FluentLink, Table } from "~/components";
import { useGetPreferredRaces } from "~/context";
import { formatDate, getRaceResultsLink } from "~/helpers";

interface RacesListProps {
  data: IGetSeasonRacesResponse;
}

export const RacesList: React.FC<RacesListProps> = ({ data }) => {
  const [pinnedRaces, setPinnedRaces] = useGetPreferredRaces(
    data.RaceTable.season,
  );

  const handleUnpinClick = (round: string) => {
    const updatedPinnedRaces = pinnedRaces.filter((item) => item !== round);
    setPinnedRaces(updatedPinnedRaces);
  };
  const handlePinClick = (round: string) => {
    const updatedPinnedRaces = [...pinnedRaces, round];
    setPinnedRaces(updatedPinnedRaces);
  };

  const columns: TableColumnDefinition<TRace>[] = [
    createTableColumn({
      columnId: "race-name",
      renderHeaderCell: () => "Race",
      renderCell: (item) => (
        <Tooltip
          content={`View results for ${item.raceName} race`}
          relationship="description"
        >
          <FluentLink to={getRaceResultsLink(item.season, item.round)}>
            {item.raceName}
          </FluentLink>
        </Tooltip>
      ),
    }),
    createTableColumn({
      columnId: "circuit-name",
      renderHeaderCell: () => "Circuit",
      renderCell: (item) => item.Circuit.circuitName,
    }),
    createTableColumn({
      columnId: "race-date",
      renderHeaderCell: () => "Date",
      renderCell: (item) => formatDate(item.date),
    }),
    createTableColumn({
      columnId: "actions",
      renderHeaderCell: () => null,
      renderCell: (item) => {
        const isPinned = pinnedRaces.includes(item.round);
        return (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Tooltip
              content={`${isPinned ? "Unpin" : "Pin"} ${item.raceName} race`}
              relationship="label"
            >
              <ToggleButton
                size="small"
                checked={isPinned}
                icon={isPinned ? <PinFilled /> : <PinRegular />}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  if (isPinned) handleUnpinClick(item.round);
                  else handlePinClick(item.round);
                }}
              />
            </Tooltip>

            <ButtonLink
              iconPosition="after"
              icon={<ArrowRightRegular />}
              to={getRaceResultsLink(item.season, item.round)}
            >
              View Results
            </ButtonLink>
          </div>
        );
      },
    }),
  ];

  return <Table rows={data.RaceTable.Races} columns={columns} />;
};
