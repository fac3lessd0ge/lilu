// @ts-ignore
import { api } from './api';

export interface ICartItem {
  basket_cell_id: number;
  product: {
    product_id: number;
    product_type_id: number;
    name: string;
    desc: string;
    price: number;
    am: number;
    image: string[];
  };
  quantity: number;
  price: number;
}

export interface CartItemsResponse {
  backet_id: number;
  total_price: number | null;
  basket_cells: ICartItem[];
}

export interface IPostOrder {
  user_info: {
    user_id: number;
    phone_number?: string;
    mail?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    device_type?: string;
  };
  bill_info: {
    user_info: number;
    need_shipment?: boolean;
    delivery_type?: string;
    country_code?: number;
    state?: string;
    city?: string;
    address_1?: string;
    post_code?: number | string;
  };
}

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItemsResponse, void>({
      query: () => `cart`,
      providesTags: ['Cart'],
      transformResponse: (response: {
        status: number;
        data: CartItemsResponse;
      }) => response.data,
    }),

    addCartItem: builder.mutation<
      CartItemsResponse,
      { product_id: number; product_count: number }
    >({
      query: (body) => ({
        url: 'cart/products/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
    editCartItem: builder.mutation<
      CartItemsResponse,
      { product_id: number; product_count: number }
    >({
      query: (body) => ({
        url: 'cart/products/set',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
    postOrder: builder.mutation<{ status: number; data: string }, IPostOrder>({
      query: (body) => ({
        url: 'payment/send',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCartItemsQuery,
  useAddCartItemMutation,
  useEditCartItemMutation,
  usePostOrderMutation,
} = cartApi;
