import React from 'react';
import { connect } from 'react-redux';

const App = ({ user }) => (
  <section>
    <h1>Validate</h1>
    <p>{user.id} {user.name}</p>
  </section>
);

export default connect(state => ({
  user: state.data.user,
}))(App);
