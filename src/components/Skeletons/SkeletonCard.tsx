import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { StyledCard } from '../Card/Card';

const shimmerAnimation = keyframes`
  0% {
    transform: translateX(-400px) rotate(45deg)
  }
  100% {
    transform: translateX(200px) rotate(45deg)
  }
`;

const Shimmer = styled.div`
  background-color: #fff6;
  width: 420px;
  height: 100px;
  position: absolute;
  bottom: 40px;
  transform: rotate(45deg);
  animation: ${shimmerAnimation} 2s ease-in 0s infinite;
`;

const StyledSkeletonCard = styled(StyledCard)`
  overflow: hidden;
  cursor: inherit;
`;

export const SkeletonCard: React.FC = () => {
  return (
    <StyledSkeletonCard>
      <Shimmer />
    </StyledSkeletonCard>
  )
}