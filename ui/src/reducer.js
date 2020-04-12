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
  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
};

export const reducer = (state, action) => {
  const { GET_ITEMS, ADD_ITEM, DELETE_ITEM } = ACTION_TYPES;
  const { LOADED } = DATA_STATES;

  switch(action.type) {
    case GET_ITEMS:
      return {
        ...state,
        dataState: LOADED,
        items: [...action.payload],
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item !== action.payload),
      };
  }
};