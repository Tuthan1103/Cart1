import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const cart = useSelector(state => state.cart.items);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="logo">Shop</Link>
      <Link to="/cart" className="cart-icon">
        <FaShoppingCart />
        {totalQuantity > 0 &&  <span className="cart-count"><span className='number'>{totalQuantity}
            </span> </span>}
      </Link>
    </header>
  );
};

export default Header;
