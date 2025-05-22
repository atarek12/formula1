import { createBrowserRouter } from "react-router";
import { Seasons } from "./Seasons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Seasons />,
  },
]);
