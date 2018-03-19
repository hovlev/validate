import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import styles from '../App/index.css';

const FormField = ({ card, changeEvent, id, label, valid}) => (
  <fieldset>
    <label
      className={styles.label}
      htmlFor={id}>
      {label}
    </label>
    <input
      className={[styles.input, valid ? styles.valid : ''].join(' ')}
      onChange={e => changeEvent(e.target.value, id)}
      id={id}
      name={id}
      type="text"
      value={card[id]}
    />
  </fieldset>
);

const CreditCard = ({ card, offer, validation, creditCardChange }) => [
  <p key="amount" className={styles.warning}>{`You're making an offer of ${offer.currency}${offer.value}. Don't worry, we'll only take payment when your offer is accepted.`}</p>,
  <FormField key="number" id="number" card={card} changeEvent={creditCardChange} label="Credit card number" valid={validation.number} />,
  <FormField key="expiry" id="expiryDate" card={card} changeEvent={creditCardChange} label="Expiry date" valid={validation.expiryDate} />,
  <FormField key="cvv" id="cvv" card={card} changeEvent={creditCardChange} label="CVV" valid={validation.cvv} />,
  <FormField key="postcode" id="postCode" card={card} changeEvent={creditCardChange} label="Postcode" valid={validation.postCode} />,
];

export default connect(
  state => ({
    offer: state.data.offer,
    validation: state.data.validation,
    card: state.data.card,
  }),
  dispatch => ({
    creditCardChange: (value, rule) =>
      dispatch({ type: actions.CREDIT_CARD_CHANGE, payload: { value, rule } }),
  })
)(CreditCard);
