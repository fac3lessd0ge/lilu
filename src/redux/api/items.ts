import { api } from "./api"; 

export interface Item {
  id: number,
  title: string,
  image: string,
  description: string,
  price: number
}

interface ItemsResponce {
  id: number,
  items: Item[]
}

const itemsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<ItemsResponce, string>({
      query: (id) => `items/${id}`,
    }),
  }),
  overrideExisting: false
})

export const { useGetItemsQuery } = itemsApi