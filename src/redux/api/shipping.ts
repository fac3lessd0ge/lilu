import { api } from './api';

interface ShippingMethod {
  id: string;
  title: string;
  description: string;
}

interface PickPoint {
  point_id: number;
  point_adress: string;
  point_city: string;
}

export interface ShippingInfo {
  shipping_methods: ShippingMethod[];
  pick_points: PickPoint[];
}

const shippingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShippingInfo: builder.query<ShippingInfo, void>({
      query: () => `shipping`,
      transformResponse: (res: { status: number; data: ShippingInfo }) =>
        res.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetShippingInfoQuery } = shippingApi;
