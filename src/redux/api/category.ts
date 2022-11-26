import { api } from './api';

export interface Category {
  category_id: number;
  title: string;
  img: string;
}

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => `category`,
      transformResponse: (response: { status: number; data: Category[] }) =>
        response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useGetCategoriesQuery } = categoryApi;
