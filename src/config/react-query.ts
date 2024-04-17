import { QueryClientProvider, QueryClient } from 'react-query';

let configs: any = null;

function initConfig() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  configs = {
    queryClient,
    QueryClientProvider,
  };
}

export function useReactQuery() {
  if (configs) {
    return configs;
  }
  initConfig();
  return configs;
}

export type ClientError = {
  code: number;
  message: string;
};
