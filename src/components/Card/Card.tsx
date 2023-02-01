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
  padding: 6px;
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
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  max-width: 200px;
  height: auto;
`;

const StyledCardTitle = styled.h3`
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

const StyledCardPrice = styled.h2`
  background-color: #ccb5d6;
  text-align: center;
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
        {title.length > 40 ? title.slice(0, 39) + '...' : title}
      </StyledCardTitle>

      {price && <StyledCardPrice>{price}</StyledCardPrice>}
    </StyledCard>
  );
};
