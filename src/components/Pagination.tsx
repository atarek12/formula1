import {
  Button,
  Label,
  makeStyles,
  Select,
  Tooltip,
} from "@fluentui/react-components";
import { ArrowLeftRegular, ArrowRightRegular } from "@fluentui/react-icons";
import React from "react";

const PageSizeOptions = [10, 20, 30, 50];

const useStyles = makeStyles({
  root: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
});

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalItems = 0,
  pageSize = 30,
  onPageChange,
  onPageSizeChange,
}) => {
  const styles = useStyles();
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange?.(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange?.(currentPage + 1);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.flex}>
        <Label>Page Size:</Label>
        <Select
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
        >
          {PageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </div>
      <div className={styles.flex}>
        <Label>Pagination:</Label>
        <Tooltip content="Next page" relationship="label">
          <Button
            icon={<ArrowLeftRegular />}
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          />
        </Tooltip>
        <Select
          value={currentPage}
          onChange={(e) => onPageChange?.(Number(e.target.value))}
        >
          {Array.from({ length: totalPages }, (_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </Select>
        <Tooltip content="Previous page" relationship="label">
          <Button
            icon={<ArrowRightRegular />}
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          />
        </Tooltip>
      </div>
    </div>
  );
};
