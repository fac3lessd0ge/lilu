import { api } from "./api"; 
import { Category } from "./category";

export interface Item {
  category: Category
  product_type_id: number
  product_name: string
  image: string
  price: number
  vendor_code: string
  description?: string
}

interface ItemsResponse {
  status: number,
  data: Item[]
}

const itemsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<ItemsResponse, string>({
      query: (id) => `category/${id}`,
      
    }),
  }),
  overrideExisting: false
})

export const { useGetItemsQuery } = itemsApi