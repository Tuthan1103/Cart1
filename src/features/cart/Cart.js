import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeItem, clearCart } from './cartSlice';
import { FaShoppingCart } from 'react-icons/fa';

function Cart() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.cart);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCartItems());
    }
  }, [status, dispatch]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h2><FaShoppingCart /> Giỏ hàng</h2>
      <button onClick={handleClearCart}>Xóa tất cả</button>
      {status === 'loading' && <div>Đang tải...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => handleRemoveItem(item.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
