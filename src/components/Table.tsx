import {
  DataGrid,
  DataGridHeader,
  DataGridRow,
  DataGridHeaderCell,
  DataGridBody,
  DataGridCell,
  type TableColumnDefinition,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  highlight: {
    outline: `1px solid ${tokens.colorStatusSuccessBorder1}`,
    backgroundColor: tokens.colorStatusSuccessBackground1,
  },
});

interface TableProps<T> {
  columns: TableColumnDefinition<T>[];
  rows: T[];
  highlightRows?: string[];
  getItemId?: (item: T) => string;
}

export function Table<T>({
  rows,
  columns,
  highlightRows,
  getItemId,
}: TableProps<T>) {
  const styles = useStyles();

  return (
    <DataGrid data-testid="table" items={rows} columns={columns}>
      <DataGridHeader>
        <DataGridRow data-testid="table-header">
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<T>>
        {({ item, rowId }) => {
          const itemId = getItemId?.(item) || "";
          return (
            <DataGridRow
              key={rowId}
              data-testid="table-row"
              className={highlightRows?.includes(itemId) && styles.highlight}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          );
        }}
      </DataGridBody>
    </DataGrid>
  );
}
