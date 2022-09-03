import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Suggestion {
    value:              string;
    unrestricted_value: string;
    data:               Data;
}

export interface Data {
  country:                 string;
  country_iso_code:        string;
  region_fias_id:          string;
  region_kladr_id:         string;
  region_iso_code:         string;
  region_with_type:        string;
  region_type:             string;
  region_type_full:        string;
  region:                  string;
  city_fias_id:            string;
  city_kladr_id:           string;
  city_with_type:          string;
  city_type:               string;
  city_type_full:          string;
  city:                    string;
  street_fias_id:          string;
  street_kladr_id:         string;
  street_with_type:        string;
  street_type:             string;
  street_type_full:        string;
  street:                  string;
  fias_id:                 string;
  fias_level:              string;
  fias_actuality_state:    string;
  kladr_id:                string;
  geoname_id:              string;
  capital_marker:          string;
  okato:                   string;
  oktmo:                   string;
  tax_office:              string;
  tax_office_legal:        string;
  geo_lat:                 string;
  geo_lon:                 string;
  qc_geo:                  string;
  history_values:          string[];
}

const baseAddressQuery = fetchBaseQuery({
  baseUrl: `${process.env.REACT_APP_ADDRESS_API_URL}`,
  prepareHeaders: (headers, ) => {
    const token = process.env.REACT_APP_ADDRESS_API_TOKEN
    if (token) {
      headers.set('Authorization', `Token ${token}`);
    }
    headers.set('Accept', 'application/json');
    headers.set('Content-Type', 'application/json');
    return headers
  },
})

export const addressApi = createApi({
  reducerPath: 'addressapi',
  baseQuery: baseAddressQuery,
  endpoints: (builder) => ({
    getSuggestedAddresses: builder.mutation<Suggestion[], string>({
      query: (address) => ({
        url: '/address',
        method: 'post',
        body: { query: address, count: 5 }
      }),
      transformResponse: (response:  { suggestions: Suggestion[] } , meta, arg) => {
        return response.suggestions
      }
    }),
  }),
})

export const { useGetSuggestedAddressesMutation } = addressApi
