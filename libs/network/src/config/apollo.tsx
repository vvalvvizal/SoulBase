import { ReactNode } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';

export interface IApolloProviderProps {
  children: ReactNode;
}

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  const apolloClient = new ApolloClient({
    uri: import.meta.env.VITE_PUBLIC_API_URL + '/graphql',
    cache: new InMemoryCache(),
  });

  return <Provider client={apolloClient}>{children}</Provider>;
};
