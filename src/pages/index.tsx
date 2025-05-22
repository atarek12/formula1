import { createBrowserRouter } from "react-router-dom";
import { RacesPage } from "./Races";
import { AppWrapper } from "~/components";
import { SeasonsPage } from "./Seasons";
import { ResultsPage } from "./Results";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    children: [
      {
        path: "",
        element: <SeasonsPage />,
      },
      {
        path: "seasons/:seasonId/races",
        element: <RacesPage />,
      },
      {
        path: "seasons/:seasonId/races/:roundId/results",
        element: <ResultsPage />,
      },
    ],
  },
]);
