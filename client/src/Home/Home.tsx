import React from 'react';
import { useUserContext } from '../UserProvider/UserProvider';

import styles from './Home.module.css';

export default function Home() {
  const user = useUserContext();

  return (
    <div className={styles['home']}>
      <h2>Hello, {user.name}!</h2>
      <h3>Your permissions:</h3>
      <ul className={styles['permissions']}>
        {user.permissions.length
          ? user.permissions.map((permission) => (
              <li key={permission}>{permission}</li>
            ))
          : 'None'}
      </ul>
    </div>
  );
}
