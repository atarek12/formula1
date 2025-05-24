import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";
import { describe, it, expect, vi } from "vitest";

describe("Pagination", () => {
  it("renders pagination controls when there are multiple pages", () => {
    render(<Pagination totalItems={100} pageSize={30} />);

    // Should show pagination controls (4 pages)
    expect(screen.getByText("Pagination:")).toBeInTheDocument();

    // Should have next/previous buttons
    expect(screen.getByTestId("button-previous-page")).toBeInTheDocument();
    expect(screen.getByTestId("button-next-page")).toBeInTheDocument();

    // Should have page selector with 4 options
    const pageSelect = screen.getByTestId("select-current-page");
    expect(pageSelect).toBeInTheDocument();
    expect(pageSelect.querySelectorAll("option").length).toBe(4);
  });

  it("hides pagination controls when there's only one page", () => {
    render(<Pagination totalItems={30} pageSize={30} />);

    // Pagination controls shouldn't be visible
    expect(screen.queryByText("Pagination:")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("button-previous-page"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("button-next-page")).not.toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination totalItems={100} pageSize={30} currentPage={1} />);

    const prevButton = screen.getByTestId("button-previous-page");
    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination totalItems={100} pageSize={30} currentPage={4} />);

    const nextButton = screen.getByTestId("button-next-page");
    expect(nextButton).toBeDisabled();
  });

  it("enables both buttons on middle pages", () => {
    render(<Pagination totalItems={100} pageSize={30} currentPage={2} />);

    const prevButton = screen.getByTestId("button-previous-page");
    const nextButton = screen.getByTestId("button-next-page");

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it("calls onPageChange when clicking previous button", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        totalItems={100}
        pageSize={30}
        currentPage={2}
        onPageChange={onPageChange}
      />,
    );

    const prevButton = screen.getByTestId("button-previous-page");
    fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange when clicking next button", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        totalItems={100}
        pageSize={30}
        currentPage={2}
        onPageChange={onPageChange}
      />,
    );

    const nextButton = screen.getByTestId("button-next-page");
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when selecting a page from dropdown", () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        totalItems={100}
        pageSize={30}
        currentPage={1}
        onPageChange={onPageChange}
      />,
    );

    const pageSelect = screen.getByTestId("select-current-page");
    fireEvent.change(pageSelect, { target: { value: "3" } });

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageSizeChange and resets to page 1 when changing page size", () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        totalItems={100}
        pageSize={30}
        currentPage={2}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />,
    );

    const pageSizeSelect = screen.getByTestId("select-pagesize");
    fireEvent.change(pageSizeSelect, { target: { value: "50" } });

    expect(onPageSizeChange).toHaveBeenCalledWith(50);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("shows correct page size options", () => {
    render(<Pagination />);

    const pageSizeSelect = screen.getByTestId("select-pagesize");
    const options = pageSizeSelect.querySelectorAll("option");

    expect(options.length).toBe(4);
    expect(options[0].textContent).toBe("10");
    expect(options[1].textContent).toBe("20");
    expect(options[2].textContent).toBe("30");
    expect(options[3].textContent).toBe("50");
  });

  it("calculates total pages correctly", () => {
    render(<Pagination totalItems={95} pageSize={30} />);

    const pageSelect = screen.getByTestId("select-current-page");
    const options = pageSelect.querySelectorAll("option");

    // 95/30 = 3.17, should round up to 4 pages
    expect(options.length).toBe(4);
  });
});
