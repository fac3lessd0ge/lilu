import { api } from "./api";

interface Category {
  id: number,
  title: string,
  animation: object
}

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `categories`,
    }),
  }),
  overrideExisting: false
})

export const { useGetCategoriesQuery } = categoryApi