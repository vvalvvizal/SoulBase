//The graph용 apolloclient
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphClient = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/111362/pool-status/version/latest', //배포한  uri
  cache: new InMemoryCache(),
});
