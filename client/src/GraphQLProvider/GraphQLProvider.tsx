import React, { ReactNode } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
  makeVar,
} from '@apollo/client';

export const tokenRVar = makeVar<string>('');

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: tokenRVar(),
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

type GraphQLProviderProps = {
  children: ReactNode;
};

export default function GraphQLProvider({ children }: GraphQLProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
