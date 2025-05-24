/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import { SwitchView } from "./SwitchView";
import { ViewEnum } from "~/context";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the context hook
vi.mock("~/context", () => {
  const useViewContext = vi.fn();
  return {
    useViewContext,
    ViewEnum: { LIST: "list", GRID: "grid" },
  };
});

// Import after mocking
import { useViewContext } from "~/context";

describe("SwitchView", () => {
  const setViewMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders in LIST view mode correctly", () => {
    // Setup the mock to return LIST view
    (useViewContext as any).mockReturnValue([ViewEnum.LIST, setViewMock]);

    render(<SwitchView />);

    // Verify LIST label has the selected class
    const listLabel = screen.getByText("List");
    expect(listLabel).toHaveAttribute("aria-checked", "true");

    // Verify GRID label doesn't have the selected class
    const gridLabel = screen.getByText("Grid");
    expect(gridLabel).toHaveAttribute("aria-checked", "false");

    // Verify screen reader text
    const srElement = screen.getByText(/Current view is: List view/i);
    expect(srElement).toBeInTheDocument();
  });

  it("renders in GRID view mode correctly", () => {
    // Setup the mock to return GRID view
    (useViewContext as any).mockReturnValue([ViewEnum.GRID, setViewMock]);

    render(<SwitchView />);

    // Verify GRID label has the selected class
    const gridLabel = screen.getByText("Grid");
    expect(gridLabel).toHaveAttribute("aria-checked", "true");

    // Verify LIST label doesn't have the selected class
    const listLabel = screen.getByText("List");
    expect(listLabel).toHaveAttribute("aria-checked", "false");

    // Verify screen reader text
    const srElement = screen.getByText(/Current view is: Grid view/i);
    expect(srElement).toBeInTheDocument();
  });

  it("toggles view from LIST to GRID when clicked", () => {
    (useViewContext as any).mockReturnValue([ViewEnum.LIST, setViewMock]);

    render(<SwitchView />);

    // Click the switch
    const switchElement = screen.getByRole("radiogroup");
    fireEvent.click(switchElement);

    // Verify setView was called with GRID
    expect(setViewMock).toHaveBeenCalledWith(ViewEnum.GRID);
  });

  it("toggles view from GRID to LIST when clicked", () => {
    (useViewContext as any).mockReturnValue([ViewEnum.GRID, setViewMock]);

    render(<SwitchView />);

    // Click the switch
    const switchElement = screen.getByRole("radiogroup");
    fireEvent.click(switchElement);

    // Verify setView was called with LIST
    expect(setViewMock).toHaveBeenCalledWith(ViewEnum.LIST);
  });

  it("toggles view when Enter key is pressed", () => {
    (useViewContext as any).mockReturnValue([ViewEnum.LIST, setViewMock]);

    render(<SwitchView />);

    // Press Enter key
    const switchElement = screen.getByRole("radiogroup");
    fireEvent.keyDown(switchElement, { key: "Enter" });

    // Verify setView was called with GRID
    expect(setViewMock).toHaveBeenCalledWith(ViewEnum.GRID);
  });

  it("toggles view when Space key is pressed", () => {
    (useViewContext as any).mockReturnValue([ViewEnum.GRID, setViewMock]);

    render(<SwitchView />);

    // Press Space key
    const switchElement = screen.getByRole("radiogroup");
    fireEvent.keyDown(switchElement, { key: " " });

    // Verify setView was called with LIST
    expect(setViewMock).toHaveBeenCalledWith(ViewEnum.LIST);
  });

  it("doesn't toggle view when other keys are pressed", () => {
    (useViewContext as any).mockReturnValue([ViewEnum.LIST, setViewMock]);

    render(<SwitchView />);

    // Press Tab key
    const switchElement = screen.getByRole("radiogroup");
    fireEvent.keyDown(switchElement, { key: "Tab" });

    // Verify setView was not called
    expect(setViewMock).not.toHaveBeenCalled();
  });

  it("has proper accessibility attributes", () => {
    (useViewContext as any).mockReturnValue([ViewEnum.LIST, setViewMock]);

    render(<SwitchView />);

    // Check the switch has proper role
    const switchElement = screen.getByRole("radiogroup");
    expect(switchElement).toHaveAttribute("tabIndex", "0");

    // Check the labels have proper roles
    const radioButtons = screen.getAllByRole("radio");
    expect(radioButtons).toHaveLength(2);

    // Check aria-live region exists
    const liveRegion = screen.getByText(/Current view is:/);
    expect(liveRegion).toHaveAttribute("aria-live", "polite");
    expect(liveRegion).toHaveAttribute("aria-atomic", "true");
  });
});
