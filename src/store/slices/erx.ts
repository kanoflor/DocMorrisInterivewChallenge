import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
  token?: string;
}
const initialState: State = {};

const erx = createSlice({
  name: 'erx',
  initialState,
  reducers: {
    setToken: (s, a: PayloadAction<string | undefined>) => {
      s.token = a.payload;
    },
  },
});

export const { setToken } = erx.actions;
export default erx.reducer;
