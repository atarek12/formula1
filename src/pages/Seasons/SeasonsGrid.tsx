import { Link, Text } from "@fluentui/react-components";
import { CalendarAgendaRegular, WindowNewRegular } from "@fluentui/react-icons";
import React from "react";
import type { IGetSeasonsResponse } from "~/API";
import { Grid } from "~/components";
import { ItemCard } from "~/components/ItemCard";
import { getRacesLink } from "~/helpers";

interface SeasonsGridProps {
  data: IGetSeasonsResponse;
}

export const SeasonsGrid: React.FC<SeasonsGridProps> = ({ data }) => {
  return (
    <Grid>
      {data.SeasonTable.Seasons.map((item) => (
        <ItemCard
          key={item.season}
          url={getRacesLink(item.season)}
          icon={<CalendarAgendaRegular fontSize={50} />}
          header={<Text weight="semibold">Season: {item.season}</Text>}
          tooltip={`View races for season ${item.season}`}
          description={
            <Link
              href={item.url}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia <WindowNewRegular />
            </Link>
          }
        />
      ))}
    </Grid>
  );
};
