import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productsSlice';
import { addItem } from '../cart/cartSlice';
import './productsList.css';

function ProductsList() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      {status === 'loading' && <div>Đang tải...</div>}
      {error && <div>Error: {error}</div>}
      <div className="products-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image || 'https://orig00.deviantart.net/cba7/f/2017/002/8/1/giratina_by_scarvii-datyzat.jpg'} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
