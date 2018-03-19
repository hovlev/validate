import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import styles from '../App/index.css';
import offerStyles from './index.css';

const HelpOffer = ({ offer }) => (
  <p>{'The '}
    <span className={[offerStyles.validation, offer.below ? styles.invalid : styles.valid].join(' ')}>{`minimum offer is ${offer.currency}${offer.min}`}</span>
    {' and the '}
    <span className={[offerStyles.validation, offer.above ? styles.invalid : styles.valid].join(' ')}>{`maximum offer is ${offer.currency}${offer.max}`}</span>.
  </p>
);

const Offer = ({ user, offer, offerChange }) => (
  <fieldset>
    <label
      className={styles.label}
      htmlFor="offer"
    >
      {`Hi ${user.name}, what's your weekly offer?`}
    </label>
    <div className={offerStyles['offer-wrapper']}>
      <p className={offerStyles['currency-symbol']}>{offer.currency}</p>
      <input
        onChange={e => offerChange(e.target.value)}
        className={[styles.input, offerStyles['offer-input'], offer.validated ? styles.valid : ''].join(' ')}
        min={offer.min}
        max={offer.max}
        placeholder={offer.min}
        id="offer"
        name="offer"
        type="number"
        value={offer.value}
      />
    </div>
    {offer.value > 0 &&
      <HelpOffer offer={offer} />
    }
  </fieldset>
);

export default connect(state => ({
  offer: state.data.offer,
  user: state.data.user,
}), dispatch => ({
  offerChange: value => dispatch({ type: actions.OFFER_CHANGE, payload: value }),
}))(Offer);
