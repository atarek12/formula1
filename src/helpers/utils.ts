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
