import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { ErrorMessage } from '../ErrorBoundary/ErrorBoundary';
import Loading from '../Loading/Loading';

const moviesQuery = gql`
  query GetMovies {
    movies {
      name
      director
    }
  }
`;

type Movie = {
  name: string;
  director: string;
};

export default function Movies() {
  const { data, loading, error } = useQuery<{ movies: Movie[] }>(moviesQuery);

  if (error) return <ErrorMessage />;
  if (loading) return <Loading />;

  console.log(data);

  return <div>Movies</div>;
}
