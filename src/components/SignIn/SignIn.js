import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const SignInFormBase = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function doLogin() {
    try {
      await props.firebase.doSignInWithEmailAndPassword(email, password);
      props.history.push(ROUTES.HOME);
    } catch(error) {
      setError(error);
    }
  }

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={(event) => event.preventDefault() && false}>
      <input
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        autoFocus
        autoComplete="off"
        autoCapitalize="off"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        autoComplete="off"
        placeholder="Password"
      />
      <button disabled={isInvalid} onClick={doLogin}>
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignIn = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

export default SignIn;

export { SignInForm };
