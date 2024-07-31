import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import Header from './component/Header';
import ProductsList from './features/products/productsList';
import CartPage from './features/cart/cartPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
