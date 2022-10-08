import { api } from "./api";

interface ItemVariant {
  name: string
  am: number
  product_id: number
  price: number
  desc: string
  image: string[]
}

const itemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItem: builder.query<ItemVariant[], string>({
      query: (id) => `type/${id}`,
      transformResponse: (res: any) =>  res.data[0].type
    }),
  }),
  overrideExisting: false
})

export const { useGetItemQuery } = itemApi