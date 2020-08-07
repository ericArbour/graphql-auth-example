import React from 'react';
import { useUserContext } from '../UserProvider/UserProvider';

export default function Home() {
  const user = useUserContext();

  return <h2>Hello, {user.name}!</h2>;
}
