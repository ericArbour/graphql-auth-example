import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import Loading from '../Loading/Loading';

const signinMutation = gql`
  mutation Signin($input: SigninInput!) {
    signin(input: $input) {
      token
      user {
        name
      }
    }
  }
`;

export default function Signin() {
  const [signin, { data, loading, error }] = useMutation(signinMutation);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  console.log(data);

  if (loading) return <Loading />;
  if (error) return <div>Oops, please refresh the page.</div>;

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
}
