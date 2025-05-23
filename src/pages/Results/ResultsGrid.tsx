import { makeStyles, Text, tokens } from "@fluentui/react-components";
import { PersonRegular } from "@fluentui/react-icons";
import React from "react";
import type { IGetRaceResultsResponse } from "~/API";
import { Grid } from "~/components";
import { ItemCard } from "~/components/ItemCard";
import { useGetPreferredDrivers } from "~/context";
import { getDriverFullName } from "~/helpers";

const useStyles = makeStyles({
  desc: {
    display: "flex",
    flexDirection: "column",
    color: tokens.colorNeutralForeground3,
  },
});

interface ResultsGridProps {
  data: IGetRaceResultsResponse;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ data }) => {
  const styles = useStyles();
  const [preferredDrivers] = useGetPreferredDrivers();

  return (
    <Grid>
      {data.RaceTable.Races[0].Results.map((item) => {
        return (
          <ItemCard
            highlight={preferredDrivers?.includes(item.Driver.driverId)}
            key={item.Driver.driverId}
            icon={<PersonRegular fontSize={50} />}
            header={
              <Text weight="semibold">{getDriverFullName(item.Driver)}</Text>
            }
            description={
              <div className={styles.desc}>
                <Text>{item.Driver.nationality}</Text>
                <Text>{item.Constructor.name}</Text>
                <Text>Position: {item.position}</Text>
              </div>
            }
          />
        );
      })}
    </Grid>
  );
};
