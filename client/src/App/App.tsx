import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import GraphQLProvider from '../GraphQLProvider/GraphQLProvider';
import UserProvider from '../UserProvider/UserProvider';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedLink from '../ProtectedLink/ProtectedLink';
import Home from '../Home/Home';
import Movies from '../Movies/Movies';
import Shows from '../Shows/Shows';
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
              <Home />
              <nav className={styles['nav']}>
                <Link to="/movies">Movies</Link>
                <ProtectedLink permission="TV" to="/shows">
                  Shows
                </ProtectedLink>
              </nav>
              <Switch>
                <Route path="/movies">
                  <Movies />
                </Route>
                <ProtectedRoute permission="TV" path="/shows">
                  <Shows />
                </ProtectedRoute>
                <Route path="/">
                  <h4>Dashboard</h4>
                </Route>
              </Switch>
            </BrowserRouter>
          </UserProvider>
        </GraphQLProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
