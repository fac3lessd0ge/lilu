import { api } from './api';

interface ItemType {
  name: string;
  am: number;
  product_id: number;
  price: number;
  desc: string;
  image: string[];
}

interface ItemData extends ItemType {
  product_name: string;
}

interface ItemRequest {
  id: string;
  type_id: string | null;
}

const itemApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getItem: builder.query<ItemData[], ItemRequest>({
      query: ({ id, type_id }) => {
        let queryString = `type/${id}`;

        queryString += type_id ? `?product_id=${type_id}` : '';

        return queryString;
      },
      transformResponse: (res: {
        data: [{ product_name: string; type: ItemType[] }];
      }) => {
        const data = res.data[0].type.map((elem: ItemType) => ({
          ...elem,
          product_name: res.data[0].product_name,
        }));

        return data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetItemQuery } = itemApi;
