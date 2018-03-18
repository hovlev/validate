import { assoc, assocPath, lt, gt, merge, prop, test } from 'ramda';
import validation from '../constants/validation';

const init = {
  offer: {
    currency: '£',
    min: 500,
    max: 50000,
    value: 0,
    below: false,
    above: false,
  },
  validation: {
    number: false,
    expiryDate: false,
    cvv: false,
    postCode: false,
  },
  user: {},
};

const validateOffer = (value, { offer }) => {
  const below = lt(value, prop('min', offer));
  const above = gt(value, prop('max', offer));
  return merge(offer, {
    below,
    above,
    validated: !below && !above,
    value,
  });
};

const validateCreditCard = ({ value, rule }, state) =>
  assocPath(['validation', rule], test(validation[rule], value), state);

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'SUBMIT':
      return state;
    case 'OFFER_CHANGE':
      return merge(state, {
        offer: validateOffer(payload, state),
      });
    case 'CREDIT_CARD_CHANGE':
      return validateCreditCard(payload, state);
    case 'USER_LOADED':
      return assoc('user', payload, state);
    default: {
      return state;
    }
  }
};
