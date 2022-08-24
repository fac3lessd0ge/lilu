import { api } from "./api"; 

export interface Item {
  id: number,
  title: string,
  image: string,
  price: number,
  description?: string
}

interface ItemsResponse {
  id: number,
  items: Item[]
}

const itemsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<ItemsResponse, string>({
      query: (id) => `items/${id}`,
    }),
  }),
  overrideExisting: false
})

export const { useGetItemsQuery } = itemsApi