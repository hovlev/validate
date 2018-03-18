import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import styles from './index.css';

const FormField = ({ changeEvent, id, label, rule, valid}) => (
  <fieldset>
    <label htmlFor={id}>{label}</label>
    <input className={valid ? styles.valid : ''} onChange={e => changeEvent(e.target.value, rule)} id={id} name={id} type="text" />
  </fieldset>
);

const CreditCard = ({ validation, creditCardChange }) => [
  <p>Your offer of {offer.currency}{offer.value} looks good!</p>,
  <FormField id="credit-card-number" rule="number" changeEvent={creditCardChange} label="Credit card number" valid={validation.number} />,
  <FormField id="credit-card-expiry" rule="expiryDate" changeEvent={creditCardChange} label="Expiry date" valid={validation.expiryDate} />,
  <FormField id="credit-card-cvv" rule="cvv" changeEvent={creditCardChange} label="CVV" valid={validation.cvv} />,
  <FormField id="credit-card-postcode" rule="postCode" changeEvent={creditCardChange} label="Postcode" valid={validation.postCode} />,
];

export default connect(state => ({
  validation: state.data.validation,
}), dispatch => ({
  creditCardChange: (value, rule) =>
    dispatch({ type: actions.CREDIT_CARD_CHANGE, payload: { value, rule } }),
}))(CreditCard);
