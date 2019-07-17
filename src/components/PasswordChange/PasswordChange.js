import React, { useState } from 'react';

import { withFirebase } from '../Firebase';

const PasswordChange = (props) => {
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  async function doChangePassword() {
    try {
      await props.firebase.doPasswordUpdate(passwordOne);
      setPasswordOne('');
      setPasswordTwo('');
      setMessage('Your password was updated.');
    } catch(error) {
      setError(error);
    }
  }

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form onSubmit={(event) => event.preventDefault() && false}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(event) => setPasswordOne(event.target.value)}
        type="password"
        autoComplete="off"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(event) => setPasswordTwo(event.target.value)}
        type="password"
        autoComplete="off"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} onClick={doChangePassword}>
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
      {message && <p>{message}</p>}
    </form>
  );
}

export default withFirebase(PasswordChange);
