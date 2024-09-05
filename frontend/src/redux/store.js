import { configureStore } from '@reduxjs/toolkit';
import { homesApi } from './api/homesApiSlice';
import { usersApi } from './api/usersApiSlice';
import homesReducer from './slices/homesSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    homes: homesReducer,
    users: usersReducer,
    [homesApi.reducerPath]: homesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(homesApi.middleware, usersApi.middleware),
});

export default store;
