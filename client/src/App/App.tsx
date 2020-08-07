import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import GraphQLProvider from '../GraphQLProvider/GraphQLProvider';
import Signin from '../Signin/Signin';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles['app']}>
      <header className={styles['app-header']}>
        <h1>Media Fans</h1>
      </header>
      <ErrorBoundary>
        <GraphQLProvider>
          <Signin />
        </GraphQLProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
