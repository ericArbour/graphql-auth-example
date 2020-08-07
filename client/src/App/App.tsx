import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import GraphQLProvider from '../GraphQLProvider/GraphQLProvider';
import UserProvider from '../UserProvider/UserProvider';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles['app']}>
      <header className={styles['app-header']}>
        <h1>Media Fans</h1>
      </header>
      <ErrorBoundary>
        <GraphQLProvider>
          <UserProvider>
            <BrowserRouter>
              <div>Test</div>
            </BrowserRouter>
          </UserProvider>
        </GraphQLProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
