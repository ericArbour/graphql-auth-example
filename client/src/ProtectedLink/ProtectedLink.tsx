import React from 'react';
import { Link } from 'react-router-dom';
import { LinkProps } from 'react-router-dom';

import { useIsAuthorized } from '../UserProvider/UserProvider';

type ProtectedLinkProps = LinkProps & {
  permission: string;
};

export default function ProtectedLink({
  permission,
  ...rest
}: ProtectedLinkProps) {
  const isAuthorized = useIsAuthorized(permission);

  return isAuthorized ? <Link {...rest} /> : null;
}
