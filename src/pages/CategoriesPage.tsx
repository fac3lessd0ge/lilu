import * as React from 'react';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import { Card } from '../components/Card/Card';
import { useGetCategoriesQuery } from '../redux/api/category';


export const CategoriesPage: React.FC = () => {
  const {data, isLoading} = useGetCategoriesQuery();

  return (
    <>
      <CardsGrid>
        {!isLoading && data?.map((elem: any) => (
          <Card
            id={elem.id}
            title={elem.title}
            animation={elem.animation}
            key={elem.id}
            href={`/category/${elem.id}`}
          />
        ))}
      </CardsGrid>
    </>
  );
}