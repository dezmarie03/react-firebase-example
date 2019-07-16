import React, { Component } from 'react';
import { compose } from 'recompose';
import uuid from 'uuid';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

import * as ROLES from '../../constants/roles';

const roleKey = uuid();

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <br />
        <span>
          <strong>Email:</strong> {user.email}
        </span>
        <br />
        <span>
          <strong>Username:</strong> {user.username}
        </span>
        <br />
        <span>
          <strong>Roles:</strong>&nbsp;
          {
            Object.keys(user.roles).map((role) => (
              <span key={roleKey}>{role}&nbsp;</span>
            ))
          }
        </span>
      </li>
    ))}
  </ul>
);

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        {!loading && <p><strong>Admin</strong> is accessible only to users with a role of <code>ADMIN</code>.</p>}
        <UserList users={users} />
      </div>
    );
  }
}

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(Admin);
