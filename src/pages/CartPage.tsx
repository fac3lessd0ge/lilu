import * as React from 'react';
import Lottie from 'react-lottie-player';
import styled from 'styled-components';
import { StyledBlock } from '../components/Block/Block';
import { CartItem } from '../components/CartItem/CartItem';
import { DropDownList } from '../components/DropdownList/DropdownList';
import { CartItemsResponse, useGetCartItemsQuery } from '../redux/api/cart';
import * as EmptyAnimation from '../assets/empty.json';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
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
  const { data, isLoading } = useGetCartItemsQuery('1');

  const isCartEmpty = (data: CartItemsResponse | undefined): boolean => {
    return !data?.items?.length
  }
 
  return (
		<PageWrapper>
			{!isLoading && !isCartEmpty(data) && 
        <CartItemsBlock>
          {data?.items?.map((elem, id) => <CartItem {...elem} key={id}/>)}
          <DropDownList additionalThumbnailString=' доставки' variants={['жыж', 'сись', 'сус']}/>
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
		</PageWrapper>
  );
}