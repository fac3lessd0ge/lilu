import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const { _auth, hash, tgid } = (getState() as RootState).userSlice;
    headers.set('initdata', `${_auth}`);
    headers.set('hash', `${hash}`);
    headers.set('tgid', `${tgid || 409093991}`);

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: 'baseapi',
  baseQuery: baseQueryWithRetry,
  endpoints: () => ({}),
  tagTypes: ['Cart'],
});
