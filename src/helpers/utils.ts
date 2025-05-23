import type { TDriver } from "~/API";

export function getSeasonLink() {
  return `/`;
}

export function getRacesLink(season: string) {
  return `/seasons/${season}/races`;
}

export function getRaceResultsLink(season: string, raceId: string) {
  return `/seasons/${season}/races/${raceId}/results`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export function getDriverFullName(driver: TDriver) {
  if (!driver) return "";
  return `${driver.givenName} ${driver.familyName}`;
}
