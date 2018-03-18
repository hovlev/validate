import { __, add, assoc, assocPath, lt, gt, merge, prop } from 'ramda';

const init = {
  offer: {
    currency: '£',
    min: 500,
    max: 50000,
    value: 0,
    below: false,
    above: false,
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

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'SUBMIT':
      return state;
    case 'OFFER_CHANGE':
      return merge(state, {
        offer: validateOffer(payload, state),
      });
    case 'USER_LOADED':
      return assoc('user', payload, state);
    default: {
      return state;
    }
  }
};
