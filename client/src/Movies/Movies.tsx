import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { ErrorMessage } from '../ErrorBoundary/ErrorBoundary';
import Loading from '../Loading/Loading';
import Card from '../Card/Card';
import { useIsAuthorized } from '../UserProvider/UserProvider';
import styles from './Movies.module.css';

const moviesQuery = gql`
  query GetMovies($isAdvancedUser: Boolean!) {
    movies {
      id
      name
      director
      rating @include(if: $isAdvancedUser)
    }
  }
`;

type Movie = {
  id: string;
  name: string;
  director: string;
  rating?: string;
};

export default function Movies() {
  const isAdvancedUser = useIsAuthorized('ADVANCED_MOVIES');
  const { data, loading, error } = useQuery<{ movies: Movie[] }>(moviesQuery, {
    variables: { isAdvancedUser },
  });

  if (error) return <ErrorMessage />;
  if (loading) return <Loading />;

  return (
    <div>
      <h4>Movies</h4>
      <ul className={styles['list']}>
        {data?.movies.map((movie) => (
          <Card key={movie.id}>
            <h4>{movie.name}</h4>
            <p>Director: {movie.director}</p>
            {movie.rating ? <p>Rating: {movie.rating} / 5</p> : null}
          </Card>
        ))}
      </ul>
    </div>
  );
}
