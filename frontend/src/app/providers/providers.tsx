import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

interface IProviders {
  children: JSX.Element;
}

const queryClient = new QueryClient();

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};

export default Providers;
