import {
  ToggleButton,
  makeStyles,
  Text,
  tokens,
  Tooltip,
} from "@fluentui/react-components";
import {
  FlagCheckeredRegular,
  PinFilled,
  PinRegular,
} from "@fluentui/react-icons";
import React from "react";
import type { IGetSeasonRacesResponse } from "~/API";
import { Grid } from "~/components";
import { ItemCard } from "~/components/ItemCard";
import { useGetPinnedRaces } from "~/context";
import { formatDate, getRaceResultsLink } from "~/helpers";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  desc: {
    display: "flex",
    flexDirection: "column",
    color: tokens.colorNeutralForeground3,
  },
});

interface RacesGridProps {
  data: IGetSeasonRacesResponse;
}

export const RacesGrid: React.FC<RacesGridProps> = ({ data }) => {
  const styles = useStyles();
  const [pinnedRaces, setPinnedRaces] = useGetPinnedRaces(
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

  return (
    <Grid>
      {data.RaceTable.Races.map((item) => {
        const isPinned = pinnedRaces.includes(item.round);
        return (
          <ItemCard
            key={item.round}
            url={getRaceResultsLink(item.season, item.round)}
            icon={<FlagCheckeredRegular fontSize={50} />}
            header={
              <div className={styles.header}>
                <Text weight="semibold">{item.raceName}</Text>
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
              </div>
            }
            tooltip={`View races for season ${item.season}`}
            description={
              <div className={styles.desc}>
                <Text>{item.Circuit.circuitName}</Text>
                <Text>{formatDate(item.date)}</Text>
              </div>
            }
          />
        );
      })}
    </Grid>
  );
};
