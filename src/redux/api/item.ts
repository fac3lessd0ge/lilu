import { api } from "./api";

interface ItemVariant {
  name: string,
  urls: string[]
}

interface ExtendedItem {
  id: number,
  title: string,
  description: string,
  price: number,
  images: ItemVariant[]
}

const itemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItem: builder.query<ExtendedItem, string>({
      query: (id) => `item/${id}`,
    }),
  }),
  overrideExisting: false
})

export const { useGetItemQuery } = itemApi