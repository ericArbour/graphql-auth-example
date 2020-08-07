import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import GraphQLProvider from '../GraphQLProvider/GraphQLProvider';
import UserProvider from '../UserProvider/UserProvider';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
              <nav>
                <ul>
                  <li>
                    <Link to="/movies">Movies</Link>
                  </li>
                  <li>
                    <Link to="/shows">Shows</Link>
                  </li>
                </ul>
              </nav>
              <Route path="/movies">
                <Movies />
              </Route>
              <ProtectedRoute privilege="TV" path="/shows">
                <Shows />
              </ProtectedRoute>
            </BrowserRouter>
          </UserProvider>
        </GraphQLProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
