import * as React from 'react';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import { Card } from '../components/Card/Card';
import { useGetCategoriesQuery } from '../redux/api/category';
import { SkeletonCard } from '../components/Skeletons/SkeletonCard';


export const CategoriesPage: React.FC = () => {
  const {data, isLoading} = useGetCategoriesQuery();

  return (
    <>
      <CardsGrid>
        {isLoading && [1, 2, 3].map((elem, id) => <SkeletonCard key={id} />)}
        
        {!isLoading && data?.map((elem: any, id) => (
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