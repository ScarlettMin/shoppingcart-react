  
import React from 'react';
import { Product } from './features/Product';
import Cart from './features/Cart';
import './App.css';

function App() {
  return (
    <div className="App">
      <Product></Product>
      <Cart></Cart>
    </div>
  );
}

export default App;
