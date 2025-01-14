import { CardType } from '@/shared/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = new Headers({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
});

export const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    headers,
  }),
  endpoints: (builder) => ({
    getAllCards: builder.query<CardType[], number>({
      query: (limit) =>
        `${URL}size=med&mime_types=jpg&format=json&order=ASC&page=1&has_breeds=1&limit=${limit}`,
    }),
  }),
});

export const { reducer } = cardsApi;

export const { useGetAllCardsQuery } = cardsApi;
