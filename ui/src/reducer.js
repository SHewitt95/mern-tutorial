import axios from 'axios';

export const DATA_STATES = {
  FETCHING: 'FETCHING',
  CANCELLED: 'CANCELLED',
  LOADED: 'LOADED',
};

export const initialState = {
  dataState: DATA_STATES.FETCHING,
  items: [], 
};

export const ACTION_TYPES = {
  GET_ITEMS: 'GET_ITEMS',
};

export const reducer = (state, action) => {
  const { GET_ITEMS } = ACTION_TYPES;
  const { LOADED } = DATA_STATES;

  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state,
        dataState: LOADED,
        items: [action.payload, ...state.items],
      };
  }
};