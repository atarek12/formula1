/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import {
  getSeasonLink,
  getRacesLink,
  getRaceResultsLink,
  formatDate,
  getDriverFullName,
  convertMillisToTime,
} from "./utils";

describe("URL helper functions", () => {
  it("getSeasonLink returns the root path", () => {
    expect(getSeasonLink()).toBe("/");
  });

  it("getRacesLink returns the correct path for a season", () => {
    expect(getRacesLink("2023")).toBe("/seasons/2023/races");
  });

  it("getRaceResultsLink returns the correct path for a race", () => {
    expect(getRaceResultsLink("2023", "5")).toBe(
      "/seasons/2023/races/5/results",
    );
  });
});

describe("formatDate", () => {
  it("formats a date correctly", () => {
    expect(formatDate("2023-05-28")).toMatch(/May 28, 2023/);
  });

  it("handles different date formats", () => {
    expect(formatDate("2023-01-01")).toMatch(/January 01, 2023/);
  });
});

describe("getDriverFullName", () => {
  it("returns the full name of a driver", () => {
    const driver: any = {
      givenName: "Lewis",
      familyName: "Hamilton",
      driverId: "hamilton",
    };
    expect(getDriverFullName(driver)).toBe("Lewis Hamilton");
  });

  it("returns empty string if driver is not provided", () => {
    expect(getDriverFullName(undefined as any)).toBe("");
  });
});

describe("convertMillisToTime", () => {
  it("formats milliseconds to time string correctly", () => {
    // 1 hour, 21 minutes, 14 seconds, 894 milliseconds
    const millis = 4874894; // 1h 21m 14s 894ms
    expect(convertMillisToTime(millis)).toBe("1:21:14.894");
  });

  it("handles just minutes, seconds, and milliseconds", () => {
    const millis = 74894; // 1m 14s 894ms
    expect(convertMillisToTime(millis)).toBe("0:1:14.894");
  });

  it("handles just seconds and milliseconds", () => {
    const millis = 14894; // 14s 894ms
    expect(convertMillisToTime(millis)).toBe("0:0:14.894");
  });

  it("handles just milliseconds", () => {
    const millis = 894; // 894ms
    expect(convertMillisToTime(millis)).toBe("0:0:0.894");
  });

  it("handles zero", () => {
    expect(convertMillisToTime(0)).toBe("0:0:0.0");
  });
});
