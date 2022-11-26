import * as React from 'react';
import styled from 'styled-components';
import { useDelayedNavigation } from '../../hooks/useDelayedNavigation';

interface ICard {
  children?: React.ReactNode;
  title: string;
  id: number;
  price?: number;
  href: string;
  imgUrl?: string;
}

export const StyledCard = styled.div`
  background-color: #ede1ed;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 120px;
  max-width: 200px;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
`;

const StyledCardImage = styled.img`
  max-height: 180px;
  width: 100%;
  padding: 5px;
  border-radius: 10px;
  max-width: 200px;
  height: auto;
`;

const StyledCardTitle = styled.h3`
  width: 100%;
  text-align: center;
  margin-top: 0;
  font-size: 16px;
  margin-bottom: 10px;
  padding: 0px 5px;
`;

const StyledCardPrice = styled.h2`
  background-color: #ccb5d6;
  text-align: center;
  margin: 0 5px 8px 5px;
  border-radius: 5px;

  &::after {
    content: ' руб.';
    font-size: 20px;
  }
`;

export const Card: React.FC<ICard> = ({
  children,
  title,
  id,
  price,
  href,
  imgUrl,
}) => {
  const navigate = useDelayedNavigation(0);

  return (
    <StyledCard onClick={() => navigate(href)}>
      {imgUrl && <StyledCardImage src={imgUrl} />}

      <StyledCardTitle>
        {title.length > 35 ? title.slice(0, 34) + '...' : title}
      </StyledCardTitle>

      {price && <StyledCardPrice>{price}</StyledCardPrice>}
    </StyledCard>
  );
};
