import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  makeStyles,
} from "@fluentui/react-components";
import React from "react";
import { useParams } from "react-router-dom";
import { BreadcrumbButtonLink } from "./BreadcrumbButtonLink";

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
            name: `Race ${params.roundId}`,
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
