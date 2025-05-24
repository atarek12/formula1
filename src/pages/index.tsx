import { createBrowserRouter } from "react-router-dom";
import { AppWrapper } from "~/components";
import { ErrorBoundary } from "./ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "",
        async lazy() {
          const { SeasonsPage } = await import("./Seasons");
          return { Component: SeasonsPage };
        },
      },
      {
        path: "seasons/:seasonId/races",
        async lazy() {
          const { RacesPage } = await import("./Races");
          return { Component: RacesPage };
        },
      },
      {
        path: "seasons/:seasonId/races/:roundId/results",
        async lazy() {
          const { ResultsPage } = await import("./Results");
          return { Component: ResultsPage };
        },
      },
      {
        path: "*",
        async lazy() {
          const { NotFound } = await import("./NotFound");
          return { Component: NotFound };
        },
      },
    ],
  },
]);
