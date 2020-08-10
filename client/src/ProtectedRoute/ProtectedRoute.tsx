import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router-dom';

import { useIsAuthorized } from '../UserProvider/UserProvider';

type ProtectedRouteProps = RouteProps & {
  permission: string;
};

export default function ProtectedRoute({
  permission,
  children,
  ...rest
}: ProtectedRouteProps) {
  const isAuthorized = useIsAuthorized(permission);

  return (
    <Route {...rest}>{isAuthorized ? children : <Redirect to="/" />}</Route>
  );
}
