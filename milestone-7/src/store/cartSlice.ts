import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartState, CartItem } from '../types';

const storedItems = localStorage.getItem('cartItems');
const parsedItems: CartItem[] = storedItems ? JSON.parse(storedItems) : [];

const initialState: CartState = {
  items: parsedItems,
  totalQuantity: parsedItems.reduce((t, i) => t + i.quantity, 0),
  totalAmount: parsedItems.reduce((t, i) => t + i.price * i.quantity, 0),
};

const recalculate = (state: CartState): void => {
  state.totalQuantity = state.items.reduce((t, i) => t + i.quantity, 0);
  state.totalAmount = state.items.reduce((t, i) => t + i.price * i.quantity, 0);
  localStorage.setItem('cartItems', JSON.stringify(state.items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existing = state.items.find((item) => item.id === newItem.id);

      if (!existing) {
        state.items.push({ ...newItem });
      } else {
        existing.quantity += newItem.quantity;
      }
      recalculate(state);
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      recalculate(state);
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      recalculate(state);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cartItems');
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
