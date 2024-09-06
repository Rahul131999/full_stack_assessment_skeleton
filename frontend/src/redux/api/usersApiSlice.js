import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/user/find-all',
    }),
    findUsersByHome: builder.query({
      query: (homeId) => `/user/find-by-home/${homeId}`,
    }),
  }),
});

export const { useGetUsersQuery, useFindUsersByHomeQuery } = usersApi;
