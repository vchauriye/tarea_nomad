import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialView from './InitialView.jsx';
import CheckoutView from './CheckoutView';

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InitialView setCart={setCart} />} />
        <Route path="/checkout" element={<CheckoutView cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
