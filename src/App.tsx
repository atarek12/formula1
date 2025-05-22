import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </FluentProvider>
  );
}

export default App;
