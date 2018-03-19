import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import styles from '../App/index.css';

const FormField = ({ changeEvent, id, label, valid}) => (
  <fieldset>
    <label htmlFor={id}>{label}</label>
    <input
      className={valid ? styles.valid : ''}
      onChange={e => changeEvent(e.target.value, id)}
      id={id}
      name={id}
      type="text"
    />
  </fieldset>
);

const CreditCard = ({ offer, validation, creditCardChange }) => [
  <p key="amount">{`You're making an offer of ${offer.currency}${offer.value}. Don't worry, we'll only take payment when your offer is accepted.`}</p>,
  <FormField key="number" id="number" changeEvent={creditCardChange} label="Credit card number" valid={validation.number} />,
  <FormField key="expiry" id="expiryDate" changeEvent={creditCardChange} label="Expiry date" valid={validation.expiryDate} />,
  <FormField key="cvv" id="cvv" changeEvent={creditCardChange} label="CVV" valid={validation.cvv} />,
  <FormField key="postcode" id="postCode" changeEvent={creditCardChange} label="Postcode" valid={validation.postCode} />,
];

export default connect(
  state => ({
    offer: state.data.offer,
    validation: state.data.validation,
  }),
  dispatch => ({
    creditCardChange: (value, rule) =>
      dispatch({ type: actions.CREDIT_CARD_CHANGE, payload: { value, rule } }),
  })
)(CreditCard);
