import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homesApi = createApi({
  reducerPath: 'homesApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    getHomesByUser: builder.query({
      query: ({ userId, page = 1 }) => `/home/find-by-user/${userId}?page=${page}`,
      providesTags: ['Homes'],
    }),
    updateHomeUsers: builder.mutation({
      query: ({ homeId, userIds }) => ({
        url: `/home/update-users/${homeId}`,
        method: 'PUT',
        body: { userIds },
      }),
      invalidatesTags: ['Homes'],
    }),
  }),
});

export const { useGetHomesByUserQuery, useUpdateHomeUsersMutation } = homesApi;
