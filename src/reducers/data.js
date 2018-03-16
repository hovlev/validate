import { assoc } from 'ramda';

const init = {
  user: {}
};

export default (state = init, { payload, type }) => {
  switch (type) {
    case 'SUBMIT':
      return state;
    case 'USER_LOADED':
      return assoc('user', payload, state);
    default: {
      return state;
    }
  }
};
