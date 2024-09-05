import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  homes: [],
};

const homesSlice = createSlice({
  name: 'homes',
  initialState,
  reducers: {
    setHomes: (state, action) => {
      state.homes = action.payload;
    },
  },
});

export const { setHomes } = homesSlice.actions;
export default homesSlice.reducer;
