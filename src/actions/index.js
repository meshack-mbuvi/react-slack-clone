import * as actionTypes from './types';

// user actions
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

// channel actions
export const setCurrentChannel = (channel) => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel,
    },
  };
};

export const setChannels = (channel) => {
  return {
    type: actionTypes.SET_CHANNELS,
    payload: {
      channel,
    },
  };
};

// message actions
// export const setMessages = ()
