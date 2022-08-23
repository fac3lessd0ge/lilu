import * as React from 'react';
import Lottie from 'react-lottie-player';
import styled from 'styled-components';
import * as EmptyAnimation from '../assets/empty.json';

const EmptyMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 130px);
`;

export const CartPage : React.FC = () => {
  return (
		<EmptyMessageWrapper>
			<Lottie
				animationData={EmptyAnimation}
				play
				loop
				style={{ width: '100%' }}
			/>
      <h2>Ваша корзина пуста :(</h2>
		</EmptyMessageWrapper>
  );
}