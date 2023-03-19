import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const { _auth, hash, tgid } = (getState() as RootState).userSlice;
    headers.set('initdata', `${_auth}`);
    headers.set('hash', `${hash}`);
    headers.set('tgid', `${tgid}`);

    return headers;
  },
});

export const api = createApi({
  reducerPath: 'baseapi',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Cart'],
});
