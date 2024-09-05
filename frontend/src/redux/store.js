import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './api/usersApiSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});

export default store;
