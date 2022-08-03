import * as React from 'react';
import styled from 'styled-components';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';

const TestCard = styled.div`
  background-color: #EDE1ED;
  min-height: 170px;
  min-width: 140px;
  max-width: 250px;
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;

export const CategoriesPage: React.FC = () => {
  return (
    <>
      <CardsGrid>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elem) => <TestCard>elem</TestCard>)}
      </CardsGrid>
    </>
  )
}