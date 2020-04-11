import React, { useState } from 'react';
import './App.css';

const List = ({ items }) => {
  return (
    <ul>
      {items.map((item, idx) => <li key={idx}>{item}</li>)}
    </ul>
  );
};

function App() {
  const [items, addItem] = useState([]);
  const [value, setValue] = useState('');
  return (
    <div className="App">
      <p>Hello</p>
      <List items={items} />
      <form onSubmit={e => {
        e.preventDefault();
        addItem([...items, value])
      }}>
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;
