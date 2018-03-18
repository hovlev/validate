import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import styles from './index.css';
import CreditCard from '../CreditCard';

const HelpOffer = ({ offer }) =>
  <p>The <span className={offer.below ? styles.invalid : styles.valid}>{`minimum offer is ${offer.currency}${offer.min}`}</span> and the <span className={offer.above ? styles.invalid : styles.valid}>{`maximum offer is ${offer.currency}${offer.max}`}</span>.</p>;

const App = ({ canSubmit, offer, user, offerChange }) => (
  <section>
    <h1>Validate</h1>
    <form>
      <fieldset>
        <label htmlFor="offer">{`Hi ${user.name}, what's your weekly offer?`}</label>
        <p>{offer.currency}</p>
        <input
          onChange={e => offerChange(e.target.value)}
          className={offer.validated ? styles.valid : ''}
          id="offer"
          min={offer.min}
          max={offer.max}
          placeholder={offer.min}
          name="offer"
          type="number"
          value={offer.value}
        />
        {offer.value > 0 &&
          <HelpOffer offer={offer} />
        }
      </fieldset>
      {offer.validated &&
        <CreditCard />
      }
      <button className={canSubmit ? styles.valid : styles.invalid} disabled={!canSubmit}>Submit</button>
    </form>
  </section>
);

export default connect(state => ({
  canSubmit: state.data.canSubmit,
  user: state.data.user,
  offer: state.data.offer,
}), dispatch => ({
  offerChange: value => dispatch({ type: actions.OFFER_CHANGE, payload: value }),
}))(App);
