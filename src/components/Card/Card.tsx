import * as React from 'react';
import styled from 'styled-components';
import { useDelayedNavigation } from '../../hooks/useDelayedNavigation';

interface ICard {
  title: string;
  id: number;
  price?: number;
  href: string;
  imgUrl?: string;
}

export const StyledCard = styled.div`
  min-height: 200px;
  display: flex;
  padding: 6px;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ccb5d6;
  min-width: 120px;
  max-width: 200px;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
`;

const StyledCardImage = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  max-width: 200px;
  height: auto;
`;

const StyledCardTitle = styled.p`
  width: 100%;
  display: grid;
  text-align: center;
  place-items: center;
  word-break: break-word;
  min-height: 60px;
  margin-top: 0;
  font-size: 16px;
  height: 100%;
  line-height: 24px;
  padding: 0px 5px;
`;

const StyledCardPrice = styled.p`
  background-color: transparent;
  text-align: center;
  border-radius: 5px;
  font-size: 20px;
  padding: 1px;

  &::after {
    content: ' руб.';
    font-size: 20px;
  }
`;

export const Card: React.FC<ICard> = ({
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
        {title.length > 40 ? title.slice(0, 39) + '...' : title}
      </StyledCardTitle>

      {price && <StyledCardPrice>{price.toString().split('.')[0]}</StyledCardPrice>}
    </StyledCard>
  );
};
