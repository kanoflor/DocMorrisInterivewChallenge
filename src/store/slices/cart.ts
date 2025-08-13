import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface State {
  items: CartItem[];
}
const initialState: State = { items: [] };

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find(it => it.id === action.payload.id);
      if (existing) {
        existing.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(it => it.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; qty: number }>,
    ) => {
      const item = state.items.find(it => it.id === action.payload.id);
      if (item && action.payload.qty > 0) {
        item.qty = action.payload.qty;
      } else if (item && action.payload.qty <= 0) {
        state.items = state.items.filter(it => it.id !== action.payload.id);
      }
    },
    clear: s => {
      s.items = [];
    },
  },
});

export const { addItem, deleteItem, updateQuantity, clear } = cart.actions;
export default cart.reducer;
