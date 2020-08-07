import React, { useState, createContext, ReactNode, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { tokenRVar } from '../GraphQLProvider/GraphQLProvider';

import { ErrorMessage } from '../ErrorBoundary/ErrorBoundary';
import Loading from '../Loading/Loading';

export type User = {
  id: string;
  name: string;
  privileges: string;
};

type AuthUser = {
  token: string;
  user: User;
};

const UserContext = createContext<null | User>(null);

export function useUserContext() {
  const maybeUser = useContext(UserContext);

  if (!maybeUser)
    throw new Error('UserContext consumer used outside of provider.');

  return maybeUser;
}

const signinMutation = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      token
      user {
        id
        name
        privileges
      }
    }
  }
`;

type SigninProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: SigninProps) {
  const [user, setUser] = useState<User | null>(null);
  const [signin, { loading, error }] = useMutation<{ signin: AuthUser }>(
    signinMutation,
    {
      onCompleted(data) {
        tokenRVar(data.signin.token);
        setUser(data.signin.user);
      },
    }
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  if (error) return <ErrorMessage />;
  if (loading) return <Loading />;

  if (!user)
    return (
      <div>
        <h2>Log In</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signin({ variables: { input: { email, password } } });
          }}
        >
          <label>
            Email:
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Password:
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button disabled={!email || !password}>Submit</button>
        </form>
      </div>
    );

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
