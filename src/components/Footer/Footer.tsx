import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDelayedNavigation } from '../../hooks/useDelayedNavigation';

interface FooterProps {
  visible: boolean;
}

const StyledFooter = styled.footer<FooterProps>`
  height: 60px;
  background-color: var(--footerColor);
  position: sticky;
  bottom: 0;
  color: white;
  text-align: center;
  text-transform: capitalize;
  display: grid;
  place-items: center;
  
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
`;

export const Footer : React.FC = () => {
  const location = useLocation();
  const navigate = useDelayedNavigation(0);

  console.log(location);
  

  return (
    <StyledFooter visible={location.pathname !== '/cart'} onClick={() => navigate('/cart')}>
      В Корзину
    </StyledFooter>
  )
}