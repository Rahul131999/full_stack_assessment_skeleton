import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
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
