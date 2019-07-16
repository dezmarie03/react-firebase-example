import React from 'react';
import { withAuthorization } from '../Session';

const Home = () => (
  <div>
    <h1>Home</h1>
    <p><strong>Home</strong> is accessible to 
    every signed-in user and is controlled by 
    <code>withAuthorization</code>.</p>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(Home);
