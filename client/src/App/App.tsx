import React from 'react';
import Signin from '../Signin/Signin';
import styles from './App.module.css';
import GraphQLProvider from '../GraphQLProvider/GraphQLProvider';

function App() {
  return (
    <div className={styles['app']}>
      <header className={styles['app-header']}>
        <h1>Media Fans</h1>
        <GraphQLProvider>
          <Signin />
        </GraphQLProvider>
      </header>
    </div>
  );
}

export default App;
