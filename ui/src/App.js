import React, { useState, useEffect, useReducer } from 'react';
import { initialState, reducer, ACTION_TYPES } from './reducer';
import axios from 'axios';
import './App.css';

const { DELETE_ITEM, ADD_ITEM } = ACTION_TYPES;

const List = ({ items, dispatch }) => (
  <ul>
    {items.map((item, idx) => (
      <li key={`li-${idx}`}>
        <button onClick={() => dispatch({ type: DELETE_ITEM, payload: item })}>X</button>
        {item}
      </li>
    ))}
  </ul>
);


const useItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get('/api/items')
      .then(res => {
        console.log({res})
        if (res.status === 200 && res.statusText === 'OK') {
          const resItems = res.data.map(item => item.name);
          setItems(resItems);
        }
      })
  }, []);

  return items;
}

function App() {
  const [inputValue, setInputValue] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <p>Hello</p>
      <List items={state.items} dispatch={dispatch} />
      <form onSubmit={e => {
        e.preventDefault();
        dispatch({ type: ADD_ITEM, payload: inputValue });
        setInputValue('');
      }}>
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
