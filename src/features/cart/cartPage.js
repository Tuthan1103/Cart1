import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeItem, clearCart } from './cartSlice';
import './cartPage.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.cart);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCartItems());
    }
  }, [status, dispatch]);

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (status === 'loading') {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cart-page">
      <h2>Giỏ hàng của bạn</h2>
      {items.length === 0 ? (
        <div>Giỏ hàng trống</div>
      ) : (
        <div>
          <button onClick={handleClearCart} className="clear-cart-btn">Xóa giỏ hàng</button>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image || 'https://orig00.deviantart.net/cba7/f/2017/002/8/1/giratina_by_scarvii-datyzat.jpg'} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Giá: ${item.price}</p>
                  <p>Số lượng: {item.quantity}</p>
                </div>
                <button onClick={() => handleRemoveItem(item)} className="remove-item-btn">Xóa</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
