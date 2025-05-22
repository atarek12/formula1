export type TApiResponse = {
  series: string;
  url: string;
  xmlns: string;
};

export type TPaginationRequest = {
  /* The number of records to return. The default is 30.*/
  limit?: number;
  /* The number of records to skip. The default is 0. */
  offset?: number;
};

export type TPaginationResponse = {
  /* The number of records returned. */
  limit: number;
  /* The number of records skipped. */
  offset: number;
  /* The total number of records available. */
  total: number;
};

export type TSeason = {
  /* The season year. */
  season: string;
  /* Wikipedia URL for the season. */
  url: string;
};

export type TCircuitLocation = {
  /* The latitude of the circuit. */
  lat: string;
  /* The longitude of the circuit. */
  long: string;
  /* The locality of the circuit. */
  locality: string;
  /* The country of the circuit. */
  country: string;
};

export type TCircuit = {
  /* The circuit ID. */
  circuitId: string;
  /* The circuit name. */
  circuitName: string;
  /* Wikipedia URL for the circuit. */
  url: string;
  /* The location of the circuit. */
  Location: TCircuitLocation;
};

export type TDateTime = {
  /* The date of the event. */
  date: string;
  /* The time of the event. */
  time: string;
};

export type TRace = {
  date: string;
  time: string;
  raceName: string;
  round: string;
  season: string;
  url: string;
  Circuit: TCircuit;
  Qualifying: TDateTime;
  FirstPractice: TDateTime;
  SecondPractice: TDateTime;
  ThirdPractice: TDateTime;
};

export type TResultTime = {
  millis: string;
  time: string;
};

export type TDriver = {
  driverId: string;
  code: string;
  dateOfBirth: string;
  givenName: string;
  familyName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
};

export type TSpeed = {
  speed: string;
  units: string;
};

export type TFastestLap = {
  lap: string;
  rank: string;
  Time: TResultTime;
  AverageSpeed: TSpeed;
};

export type TConstructor = {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
};

export type TResult = {
  grid: string;
  laps: string;
  number: string;
  points: string;
  position: string;
  positionText: string;
  status: string;
  Time: TResultTime;
  Driver: TDriver;
  FastestLap: TFastestLap;
  Constructor: TConstructor;
};

export type TRaceResults = TRace & {
  /* The results*/
  Results: TResult[];
};
