import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  makeStyles,
} from "@fluentui/react-components";
import React from "react";
import { useParams } from "react-router-dom";
import { BreadcrumbButtonLink } from "./BreadcrumbButtonLink";
import { useGetRaceResults } from "~/API";
import { usePrevious } from "~/helpers";

const useStyles = makeStyles({
  root: {
    "& ol": {
      flexWrap: "wrap",
    },
  },
});

interface AppBreadcrumbsProps {}

export const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = () => {
  const styles = useStyles();
  const params = useParams();
  const { data } = useGetRaceResults({
    season: params.seasonId || "",
    round: params.roundId || "",
  });
  const previousRaceName = usePrevious(data?.RaceTable.Races[0].raceName);

  const items = [
    { name: "All Seasons", path: "/" },
    ...(params.seasonId
      ? [
          {
            name: `Season ${params.seasonId}`,
            path: `/seasons/${params.seasonId}/races`,
          },
        ]
      : []),
    ...(params.roundId
      ? [
          {
            name: data?.RaceTable.Races[0].raceName ?? previousRaceName,
            path: `/seasons/${params.seasonId}/races/${params.roundId}/results`,
          },
        ]
      : []),
  ];

  return (
    <Breadcrumb aria-label="Application breadcrumb" className={styles.root}>
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return (
          // eslint-disable-next-line react-x/no-array-index-key
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbButtonLink to={item.path} current={isLastItem}>
                {item.name}
              </BreadcrumbButtonLink>
            </BreadcrumbItem>
            {!isLastItem && <BreadcrumbDivider />}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
};
