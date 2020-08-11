import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { ErrorMessage } from '../ErrorBoundary/ErrorBoundary';
import Loading from '../Loading/Loading';
import Card from '../Card/Card';
import styles from './Shows.module.css';

const showsQuery = gql`
  query GetShows {
    shows {
      id
      name
      showRunner
    }
  }
`;

type Show = {
  id: string;
  name: string;
  showRunner: string;
};

export default function Shows() {
  const { data, loading, error } = useQuery<{ shows: Show[] }>(showsQuery);

  if (error) return <ErrorMessage />;
  if (loading) return <Loading />;

  return (
    <div>
      <h4>Shows</h4>
      <ul className={styles['list']}>
        {data?.shows.map((show) => (
          <Card key={show.id}>
            <h4>{show.name}</h4>
            <p>Show Runner: {show.showRunner}</p>
          </Card>
        ))}
      </ul>
    </div>
  );
}
