import * as actionTypes from './types';

export const setUser = (user) => {
  return {
    payload: {
      currentUser: user,
    },
    type: actionTypes.SET_USER,
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER,
  };
};
