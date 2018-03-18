import { assoc, assocPath, contains, flatten, lt, gt, merge, pipe, prop, test, toPairs } from 'ramda';
import validationRules from '../constants/validation';

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
  canSubmit: false,
  hasSubmitted: false,
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

const validateCreditCard = ({ value, rule }, { validation }) =>
  assoc(rule, test(prop(rule, validationRules), value), validation);

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'SUBMIT':
      return state;
    case 'OFFER_CHANGE':
      return merge(state, {
        offer: validateOffer(payload, state),
      });
    case 'CREDIT_CARD_CHANGE':
      const isInvalid = pipe(
        toPairs,
        flatten,
        contains(false)
      );
      const validatedCreditCardFields = validateCreditCard(payload, state);
      return merge(state, {
        validation: validatedCreditCardFields,
        canSubmit: !isInvalid(validatedCreditCardFields),
      });
    case 'OFFER_SUBMIT':
      return assoc('hasSubmitted', true, state);
    case 'USER_LOADED':
      return assoc('user', payload, state);
    default: {
      return state;
    }
  }
};
