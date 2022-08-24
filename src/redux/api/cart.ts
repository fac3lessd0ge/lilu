import { api } from "./api"; 
import { Item } from "./items";

export interface ICartItem extends Item {
  chosen_variant: string,
  amount: number
}

export interface CartItemsResponse {
  id: number,
  items: ICartItem[]
}

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartItemsResponse, string>({
      query: (id) => `fakecart`,
    }),
  }),
  overrideExisting: false
})

export const { useGetCartItemsQuery } = cartApi