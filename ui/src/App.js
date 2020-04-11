import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const List = ({ items }) => {
  return (
    <ul>
      {items.map((item, idx) => <li key={idx}>{item}</li>)}
    </ul>
  );
};

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
  const items = useItems();
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <p>Hello</p>
      <List items={items} />
      <form onSubmit={e => {
        e.preventDefault();
        // addItem([...items, value])
      }}>
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
