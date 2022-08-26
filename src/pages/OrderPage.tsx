import * as React from 'react';
import { Block } from '../components/Block/Block';
import { PageWrapper } from './CartPage';

export const OrderPage: React.FC = () => {
  return (
    <PageWrapper>
      <Block>
        Атас! Напас! Заказ!
      </Block>
    </PageWrapper>
  )
}