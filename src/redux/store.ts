import { configureStore } from '@reduxjs/toolkit'
import { addressApi } from './api/address';
import { api } from './api/api';
import userSlice from './slices/userSlice';
import orderInfoSlice from './slices/orderInfoSlice';


export const store = configureStore({
  reducer: {
    userSlice,
    orderInfoSlice,
    [api.reducerPath]: api.reducer,
    [addressApi.reducerPath]: addressApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch