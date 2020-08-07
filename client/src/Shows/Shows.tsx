import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { ErrorMessage } from '../ErrorBoundary/ErrorBoundary';
import Loading from '../Loading/Loading';

const showsQuery = gql`
  query GetShows {
    movies {
      name
      showRunner
    }
  }
`;

type Show = {
  name: string;
  showRunner: string;
};

export default function Shows() {
  const { data, loading, error } = useQuery<{ movies: Show[] }>(showsQuery);

  if (error) return <ErrorMessage />;
  if (loading) return <Loading />;

  console.log(data);

  return <div>Shows</div>;
}
