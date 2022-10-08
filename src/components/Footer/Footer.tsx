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
  transition: all 0.1s ease;

  &:active {
    transform: scale(0.97);
    border-radius: 5px;
  }
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
  const navigate = useDelayedNavigation(100);
  const { data } = useGetCartItemsQuery();

  const allAmounts = React.useCallback((): number => {
    if (!data) return 0;

    return data?.basket_cells?.reduce((prev, cur) =>  prev + cur.quantity, 0)
  }, [data])

  const calculateTotalPrice = React.useCallback((): number => {
    if (!data || !data.total_price) return 0;

    return data?.total_price
  }, [data])


  switch (location.pathname) {
    case '/cart':
      return (
        <StyledFooter visible={!!data?.basket_cells?.length} onClick={() => navigate('/order')}>
          Оформить заказ на {calculateTotalPrice()} руб.
        </StyledFooter>
      )
    
    case '/order':
      return (
        <StyledFooter visible={false} onClick={console.log} />
      )
    default:
      return (
        <StyledFooter visible={true} onClick={() => navigate('/cart')}>
          В Корзину <ItemCount>{allAmounts()}</ItemCount>
        </StyledFooter>
      )
  }
}