import { assoc, assocPath, contains, flatten, lt, gt, merge, path, pipe, prop, test, toPairs } from 'ramda';
import validationRules from '../constants/validation';

const init = {
  offer: {
    currency: '£',
    min: 500,
    max: 50000,
    value: '',
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
  card: {
    number: '',
    expiryDate: '',
    cvv: '',
    postCode: '',
  },
  defaults: {
    value: 1000,
    number: '4111411141114111',
    expiryDate: '12/22',
    cvv: '0123',
    postCode: 'SN11NS',
  },
};

/**
  Returns whether the value is above or below the max/min, so the UI can
  highlight the correct paragraph span, also decides whether a user can
  continue with credit card validation (validated)
*/
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

/**
  Tests a particular credit card input field against a rule (number, expiryDate,
  cvv or postCode, all these rules are stored in constants/validation)
*/
const validateCreditCardRule = ({ value, rule }, { validation }) =>
  assoc(rule, test(prop(rule, validationRules), value), validation);

/**
  Selecting the populate button results in the defaults being applied to
  the form
*/
const populate = state => {
  const offer = prop('offer', state);
  return merge(state, {
    offer: merge(offer, {
      value: path(['defaults', 'value'], state),
      validated: true,
    }),
    card: prop('defaults', state),
    validation: prop('defaults', state),
    canSubmit: true,
  });
};

/**
  Contains logic deciding whether all the input fields have passed validation
  (checks if any contain the false boolean)
*/
const creditCardChange = (payload, state) => {
  const isInvalid = pipe(
    toPairs,
    flatten,
    contains(false)
  );
  const validatedCreditCardFields = validateCreditCardRule(payload, state);
  const card = prop('card', state);
  return merge(state, {
    validation: validatedCreditCardFields,
    canSubmit: !isInvalid(validatedCreditCardFields),
    card: merge(card, {
      [prop('rule', payload)]: prop('value', payload),
    }),
  });
};

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'SUBMIT':
      return state;
    case 'OFFER_CHANGE':
      return merge(state, {
        offer: validateOffer(payload, state),
      });
    case 'CREDIT_CARD_CHANGE':
      return creditCardChange(payload, state);
    case 'OFFER_SUBMIT':
      return assoc('hasSubmitted', true, state);
    case 'USER_LOADED':
      return assoc('user', payload, state);
    case 'POPULATE':
      return populate(state);
    default: {
      return state;
    }
  }
};
