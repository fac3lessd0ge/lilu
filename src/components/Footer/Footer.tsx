import * as React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useDelayedNavigation } from '../../hooks/useDelayedNavigation';
import { useGetCartItemsQuery } from '../../redux/api/cart';

interface FooterProps {
  visible?: boolean;
}

const StyledFooter = styled.footer<FooterProps>`
  height: 60px;
  background-color: var(--footerColor);
  position: sticky;
  bottom: 0;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 3px;
  align-items: center;
  
  visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
`;

const ItemCount = styled.div`
  background-color: #fff;
  display: grid;
  place-content: center;
  border-radius: 50%;
  padding: 3px;
  aspect-ratio: 1 / 1;
  min-height: 20px; 
  font-size: 12px;
  color: black;
  font-weight: 500;
  transform: translateY(1.5px);
`;

export const Footer : React.FC = () => {
  const location = useLocation();
  const navigate = useDelayedNavigation(0);
  const { data } = useGetCartItemsQuery('1');

  const allAmounts = React.useCallback((): number => {
    if (!data) return 0;

    return data?.items?.reduce((prev, cur) =>  prev + cur.amount, 0)
  }, [data])

  const calculateTotalPrice = React.useCallback((): number => {
    if (!data) return 0;

    return data?.items?.reduce((prev, cur) =>  prev + cur.amount * cur.price, 0)
  }, [data])

  if (location.pathname !== '/cart') {
    return (
      <StyledFooter visible={true} onClick={() => navigate('/cart')}>
        В Корзину <ItemCount>{allAmounts()}</ItemCount>
      </StyledFooter>
    )
  }

  return (
    <StyledFooter visible={!!data?.items?.length} onClick={() => navigate('/cart')}>
      Оформить заказ на {calculateTotalPrice()} руб.
    </StyledFooter>
  )
}