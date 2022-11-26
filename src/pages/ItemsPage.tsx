import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card/Card';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import { Item, useGetItemsQuery } from '../redux/api/items';

export const ItemsPage: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetItemsQuery(id || '');

  return (
    <>
      <CardsGrid>
        {!isLoading &&
          data?.data?.map((elem: Item) => (
            <Card
              id={elem.product_type_id}
              key={elem.product_type_id}
              title={elem.product_name}
              imgUrl={elem.image}
              href={`/item/${elem.product_type_id}`}
              price={elem.price}
            />
          ))}
      </CardsGrid>
    </>
  );
};
