import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cart';
import erx from './slices/erx';

export const store = configureStore({ reducer: { cart, erx } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
