import * as React from 'react';
import Lottie from 'react-lottie-player';
import styled from 'styled-components';
import * as EmptyAnimation from '../assets/empty.json';
import { StyledBlock } from '../components/Block/Block';
import { CartItem } from '../components/CartItem/CartItem';
import { CartItemsResponse, useGetCartItemsQuery } from '../redux/api/cart';

const CartPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 130px);
`;

const Center = styled.div`
  display: grid;
  place-items: center;
  min-height: calc(100vh - 130px);
`;

const EmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const CartItemsBlock = styled(StyledBlock)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 5px;
`;

export const CartPage : React.FC = () => {
  const { data, isLoading, refetch } = useGetCartItemsQuery('1');

  const isCartEmpty = (data: CartItemsResponse | undefined): boolean => {
    return !data?.items?.length
  }
 
  return (
		<CartPageWrapper>

			{!isLoading && !isCartEmpty(data) && 
        <CartItemsBlock>
          {data?.items?.map(elem => <CartItem {...elem}/>)}
        </CartItemsBlock>
      }

      {isCartEmpty(data) && 
        <Center>
          <EmptyWrapper>
            <Lottie
              animationData={EmptyAnimation}
              play
              loop
              style={{ width: '100%' }}
            />
            <h2>Ваша корзина пуста :(</h2>
          </EmptyWrapper>
        </Center>
      }
			

		</CartPageWrapper>
  );
}