/* eslint-disable @typescript-eslint/no-explicit-any */
import { cleanup, render, screen } from "@testing-library/react";
import { AppBreadcrumbs } from "./AppBreadcrumbs";
import { useParams } from "react-router-dom";
import { useGetRaceResults } from "~/API";
import { usePrevious } from "~/helpers";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
  Link: (props: any) => <a {...props} />,
}));

vi.mock("~/API", () => ({
  useGetRaceResults: vi.fn(),
}));

vi.mock("~/helpers", () => ({
  usePrevious: vi.fn(),
  getRacesLink: vi.fn(),
  getRaceResultsLink: vi.fn(),
}));

describe("AppBreadcrumbs", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default mock implementations
    (useParams as any).mockReturnValue({});
    (useGetRaceResults as any).mockReturnValue({ data: undefined });
    (usePrevious as any).mockReturnValue(undefined);
  });

  afterEach(cleanup);

  it("renders 'All Seasons' when no parameters are present", () => {
    render(<AppBreadcrumbs />);

    expect(screen.getByText("All Seasons")).toBeInTheDocument();
    expect(screen.getAllByTestId("breadcrumb-item")).toHaveLength(1);
  });

  it("renders season breadcrumb when seasonId is present", () => {
    (useParams as any).mockReturnValue({ seasonId: "2023" });

    render(<AppBreadcrumbs />);

    expect(screen.getByText("All Seasons")).toBeInTheDocument();
    expect(screen.getByText("Season 2023")).toBeInTheDocument();
    expect(screen.getAllByTestId("breadcrumb-item")).toHaveLength(2);
  });

  it("renders race breadcrumb when both seasonId and roundId are present", () => {
    (useParams as any).mockReturnValue({ seasonId: "2023", roundId: "1" });
    (useGetRaceResults as any).mockReturnValue({
      data: {
        RaceTable: {
          Races: [{ raceName: "Australian Grand Prix" }],
        },
      },
    });

    render(<AppBreadcrumbs />);

    expect(screen.getByText("All Seasons")).toBeInTheDocument();
    expect(screen.getByText("Season 2023")).toBeInTheDocument();
    expect(screen.getByText("Australian Grand Prix")).toBeInTheDocument();
    expect(screen.getAllByTestId("breadcrumb-item")).toHaveLength(3);
  });

  it("uses previous race name when data is not yet loaded", () => {
    (useParams as any).mockReturnValue({ seasonId: "2023", roundId: "1" });
    (useGetRaceResults as any).mockReturnValue({ data: undefined });
    (usePrevious as any).mockReturnValue("Monaco Grand Prix");

    render(<AppBreadcrumbs />);

    expect(screen.getByText("Monaco Grand Prix")).toBeInTheDocument();
  });

  it("sets correct 'current' attribute on the last breadcrumb item", () => {
    (useParams as any).mockReturnValue({ seasonId: "2023", roundId: "1" });
    (useGetRaceResults as any).mockReturnValue({
      data: {
        RaceTable: {
          Races: [{ raceName: "British Grand Prix" }],
        },
      },
    });

    render(<AppBreadcrumbs />);

    const links = screen.getAllByTestId("breadcrumb-link");
    console.log(links[2]);
    expect(links[0]).not.toHaveAttribute("aria-current", "page");
    expect(links[1]).not.toHaveAttribute("aria-current", "page");
    expect(links[2]).toHaveAttribute("aria-current", "page");
  });
});
