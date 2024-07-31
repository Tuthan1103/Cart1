import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};
export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
    const response = await axios.get('https://66a08a6f7053166bcabbc1f3.mockapi.io/student');
    return response.data;
  });
  
  export const addItemToServer = createAsyncThunk('cart/addItemToServer', async (item, { getState }) => {
    const existingItem = getState().cart.items.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // Update existing item quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      await axios.put(`https://66a08a6f7053166bcabbc1f3.mockapi.io/student/${existingItem.id}`, updatedItem);
      return updatedItem;
    } else {
      // Add new item to cart
      const response = await axios.post('https://66a08a6f7053166bcabbc1f3.mockapi.io/student', { ...item, quantity: 1 });
      return response.data;
    }
  });
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
