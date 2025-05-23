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

export function convertMillisToTime(millis: number) {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);
  const milliseconds = millis % 1000;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// it could be 1:21:14.894 or 21:14.894 or 14.894 or 894
export function convertTimeToMillis(time: string) {
  const timeParts = time.split(":").reverse();
  let millis = 0;

  for (let i = 0; i < timeParts.length; i++) {
    const part = parseInt(timeParts[i], 10);
    millis += part * Math.pow(60, i) * 1000;
  }

  return millis;
}
