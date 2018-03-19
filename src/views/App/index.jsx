import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import styles from './index.css';
import CreditCard from '../CreditCard';
import Offer from '../Offer';

const App = ({ canSubmit, hasSubmitted, populate, offer, offerSubmit }) => (
  <section>
    <h1 className={styles.heading}>Validate</h1>
    <button className={styles.button} onClick={() => populate()}>Populate form?</button>
    <form className={styles.component} onSubmit={e => offerSubmit(e)}>
      <Offer />
      {offer.validated && [
        <CreditCard key="creditCard" />,
        <button
          key="submit"
          className={[styles.submit, canSubmit ? styles.valid : styles.inactive].join(' ')}
          disabled={!canSubmit}
        >
          Submit
        </button>,
      ]}
      {hasSubmitted &&
        <p>Successfully submitted your offer! You could be paying {offer.currency}{offer.value} per week!</p>
      }
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
    populate: () => dispatch({ type: actions.POPULATE }),
  })
)(App);
