import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';

import { useUserContext, User } from '../UserProvider/UserProvider';

type ProtectedRouteProps = RouteProps & {
  permission: string;
};

function checkAuthorization(permission: string, user: User): boolean {
  return user.permissions.includes(permission);
}

export default function ProtectedRoute({
  permission,
  children,
  ...rest
}: ProtectedRouteProps) {
  const user = useUserContext();
  const isAuthorized = checkAuthorization(permission, user);

  return (
    <Route {...rest}>{isAuthorized ? children : <Redirect to="/" />}</Route>
  );
}
