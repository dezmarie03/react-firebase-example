import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChange from '../PasswordChange';

import { withAuthorization } from '../Session';
import { AuthUserContext } from '../../constants/context';

const Account = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <p><strong>Account</strong> is accessible to 
        every signed-in user and is controlled by 
        <code>withAuthorization</code>.</p>
        <p>The ability to modify the user's account is 
          controlled by <code>AuthUserContext</code>.</p>
        <PasswordForgetForm />
        <PasswordChange />
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Account);
