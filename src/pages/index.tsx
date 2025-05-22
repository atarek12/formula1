import { createBrowserRouter } from "react-router-dom";
import { Seasons } from "./Seasons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Seasons />,
  },
]);
