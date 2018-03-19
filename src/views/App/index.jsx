import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import styles from './index.css';
import CreditCard from '../CreditCard';
import Offer from '../Offer';

const App = ({ canSubmit, hasSubmitted, offer, offerSubmit }) => (
  <section>
    <h1>Validate</h1>
    <form onSubmit={e => offerSubmit(e)}>
      <Offer />
      {offer.validated && [
        <CreditCard key="creditCard" />,
        <button
          key="submit"
          className={canSubmit ? styles.valid : styles.inactive}
          disabled={!canSubmit}
        >
          Submit
        </button>,
      ]}
      {hasSubmitted && <p>Successfully submitted your offer!</p>}
    </form>
  </section>
);

export default connect(
  state => ({
    canSubmit: state.data.canSubmit,
    hasSubmitted: state.data.hasSubmitted,
    user: state.data.user,
    offer: state.data.offer,
  }),
  dispatch => ({
    offerSubmit: e => {
      e.preventDefault();
      dispatch({ type: actions.OFFER_SUBMIT });
    },
  })
)(App);
