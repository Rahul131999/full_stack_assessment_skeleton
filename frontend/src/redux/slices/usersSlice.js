import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedUser: null,
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUsers, selectUser } = usersSlice.actions;
export default usersSlice.reducer;
