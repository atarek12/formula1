import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  type TableColumnDefinition,
  createTableColumn,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";
import React from "react";

function getRandomWidth() {
  // get a random number between 50 and 100
  const randomWidth = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
  return String(randomWidth) + "%";
}

interface TableSkeletonProps {
  rowsCount?: number;
  columnsCount?: number;
  columnHeaders?: string[];
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rowsCount = 5,
  columnHeaders,
  columnsCount = 5,
}) => {
  const rows = [...new Array(rowsCount)] as undefined[];
  const headers =
    columnHeaders ?? ([...new Array(columnsCount)] as undefined[]);

  const columns: TableColumnDefinition<unknown>[] = [
    ...headers.map((c, i) => {
      return createTableColumn({
        columnId: i,
        renderHeaderCell: () => {
          return (
            c ?? (
              <Skeleton style={{ width: "100%" }}>
                <SkeletonItem />
              </Skeleton>
            )
          );
        },
        renderCell: () => {
          return (
            <Skeleton style={{ width: getRandomWidth() }}>
              <SkeletonItem />
            </Skeleton>
          );
        },
      });
    }),
  ];

  return (
    <DataGrid items={rows} columns={columns}>
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {({ item, rowId }) => (
          <DataGridRow key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
