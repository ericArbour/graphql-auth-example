import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';

import { useUserContext, User } from '../UserProvider/UserProvider';

type ProtectedRouteProps = RouteProps & {
  privilege: string;
};

function checkAuthorization(privilege: string, user: User): boolean {
  return user.privileges.includes(privilege);
}

export default function ProtectedRoute({
  privilege,
  children,
  ...rest
}: ProtectedRouteProps) {
  const user = useUserContext();
  const isAuthorized = checkAuthorization(privilege, user);

  return (
    <Route {...rest}>{isAuthorized ? children : <Redirect to="/" />}</Route>
  );
}
