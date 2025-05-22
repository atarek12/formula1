import { createBrowserRouter } from "react-router-dom";
import { SeasonsPage } from "./Seasons";
import { RacesPage } from "./Races";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SeasonsPage />,
  },
  {
    path: "seasons/:seasonId/races",
    element: <RacesPage />,
  },
]);
