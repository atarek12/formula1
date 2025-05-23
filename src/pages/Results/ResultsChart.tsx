import React, { useMemo } from "react";
import {
  HorizontalBarChart,
  HorizontalBarChartVariant,
  type ChartProps,
} from "@fluentui/react-charts";
import type { TResult } from "~/API";
import { getDriverFullName } from "~/helpers";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {},
  chart: {
    maxWidth: "600px",
    padding: "20px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "8px",
    margin: "20px 0",
  },
});

interface ResultsChartProps {
  results: TResult[];
  highlightDrivers?: string[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({
  results,
  highlightDrivers,
}) => {
  const styles = useStyles();

  const resultsWithTime = useMemo(() => {
    return results.filter((result) => result.Time && result.Time.millis);
  }, [results]);

  const [minValue, maxValue] = useMemo(() => {
    const values = resultsWithTime.map((result) => Number(result.Time!.millis));
    return [Math.min(...values), Math.max(...values)];
  }, [resultsWithTime]);

  const data: ChartProps[] = useMemo(() => {
    return resultsWithTime.map<ChartProps>((result) => ({
      chartTitle: getDriverFullName(result.Driver),
      chartData: [
        {
          legend: getDriverFullName(result.Driver),
          horizontalBarChartdata: {
            x: Number(result.Time!.millis) - minValue + 100, // Adding 100ms for better visibility for the first bar
            total: maxValue - minValue,
          },
          color: highlightDrivers?.includes(result.Driver.driverId)
            ? tokens.colorStatusSuccessBackground3
            : tokens.colorBrandBackground,
          yAxisCalloutData: `${result.Time?.time}.`,
        },
      ],
    }));
  }, [resultsWithTime, minValue, maxValue, highlightDrivers]);

  if (!data.length) {
    return <p>No results available</p>;
  }

  return (
    <div className={styles.root}>
      <h2>Performance Chart</h2>
      <HorizontalBarChart
        className={styles.chart}
        hideLabels
        data={data}
        variant={HorizontalBarChartVariant.AbsoluteScale}
      />
    </div>
  );
};
