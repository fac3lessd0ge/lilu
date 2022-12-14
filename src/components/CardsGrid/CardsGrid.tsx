import * as React from 'react';
import styled from 'styled-components';

interface CardsGridProps {
  children?: React.ReactNode
}

const StyledGrid = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  grid-template-columns: repeat(2, calc(50% - 10px));
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media screen and (min-width: 750px) {
    grid-template-columns: repeat(3, calc(33% - 10px));
  }
`;

export const CardsGrid: React.FC<CardsGridProps> = ({ children }) => {
  return (
    <StyledGrid>
      {children}
    </StyledGrid>
  )
}