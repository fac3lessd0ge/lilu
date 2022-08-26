import * as React from 'react';
import styled from 'styled-components';

interface IBlock {
  children?: React.ReactNode,
  bgcolor?: string,
  minh?: string,
  maxh?: string,
}

export const StyledBlock = styled.div<IBlock>`
  width: 100%;
  height: 100%;
  min-height: ${({ minh }) => minh || 'auto'};
  max-height: ${({ maxh }) => maxh || 'auto'};
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ bgcolor }) => bgcolor || '#eee'};
`;

export const Block: React.FC<IBlock> = ({ children, bgcolor, minh, maxh }) => {
  return (
    <StyledBlock
      bgcolor={bgcolor}
      minh={minh}
      maxh={maxh}
    >
      {children}
    </StyledBlock>
  )
}