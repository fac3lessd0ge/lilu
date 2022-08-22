import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card/Card';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import { useGetItemsQuery } from '../redux/api/items';

export const ItemsPage : React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetItemsQuery(id || '');
  
  return (
    <>
      <CardsGrid>
        {!isLoading && data?.items?.map((elem: any) => (
          <Card
            id={elem.id}
            title={elem.title}
            animation={elem?.animation}
            imgUrl={elem.image}
            key={elem.id}
            href={`/item/${elem.id}`}
            price={elem.price}
          />
        ))}
      </CardsGrid>
    </>
  )
}