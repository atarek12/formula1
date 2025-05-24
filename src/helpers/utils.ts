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

// Converts milliseconds to a time string in the format "H:MM:SS.mmm"
export function convertMillisToTime(millis: number) {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  const milliseconds = millis % 1000;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
