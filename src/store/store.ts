import { configureStore } from '@reduxjs/toolkit';
import { cardsApi, reducer as cardsApiReducer } from '@/store/cardsApi';

export const createStore = () =>
  configureStore({
    reducer: {
      cardsApi: cardsApiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cardsApi.middleware),
  });

export const store = createStore();
