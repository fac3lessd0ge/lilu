import * as React from 'react';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import { Card } from '../components/Card/Card';
import { Category, useGetCategoriesQuery } from '../redux/api/category';
import { SkeletonCard } from '../components/Skeletons/SkeletonCard';

export const CategoriesPage: React.FC = () => {
  const { data, isLoading } = useGetCategoriesQuery();

  return (
    <>
      <CardsGrid>
        {isLoading && [1, 2, 3].map((elem, id) => <SkeletonCard key={id} />)}

        {!isLoading &&
          data?.map((elem: Category, id) => (
            <Card
              id={elem.category_id}
              title={elem.title}
              animation={elem.animation}
              key={elem.category_id}
              href={`/category/${elem.category_id}`}
            />
          ))}
      </CardsGrid>
    </>
  );
};
