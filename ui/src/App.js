import React, { useState, useEffect, useReducer } from 'react';
import { initialState, reducer, ACTION_TYPES } from './reducer';
import axios from 'axios';
import './App.css';

const { DELETE_ITEM, ADD_ITEM, GET_ITEMS } = ACTION_TYPES;

const List = ({ items, dispatch }) => (
  <ul>
    {items.map((item) => (
      <li key={item._id}>
        <button onClick={() => dispatch({ type: DELETE_ITEM, payload: item })}>X</button>
        {item.name}
      </li>
    ))}
  </ul>
);

function App() {
  const [inputValue, setInputValue] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get('/api/items')
      .then(res => {
        console.log({res})
        if (res.status === 200 && res.statusText === 'OK') {
          dispatch({ type: GET_ITEMS, payload: res.data })
        }
      })
  }, []);

  return (
    <div className="App">
      <List items={state.items} dispatch={dispatch} />
      <form onSubmit={e => {
        e.preventDefault();
        axios
          .post('/api/items', { name: inputValue },
          { 
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(res => {
            dispatch({ type: ADD_ITEM, payload: res.data });
            setInputValue('');
          })
          .catch(err => console.error(err));
      }}>
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
