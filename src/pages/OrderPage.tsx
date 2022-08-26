import * as React from 'react';
import styled from 'styled-components';
import { Block } from '../components/Block/Block';
import { DropDownList } from '../components/DropdownList/DropdownList';
import { DeliveryForms } from '../components/Forms/DeliveryForms';
import { PageWrapper } from './CartPage';

const StyledOrderPageTitle = styled.h2`
  margin: 0;
  padding: 5px;
`;

const StyledOrderPageDropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 5px;
`;

export const OrderPage: React.FC = () => {
  return (
    <PageWrapper>
      <Block>
        <StyledOrderPageTitle>Оформление заказа</StyledOrderPageTitle>
        <StyledOrderPageDropdownWrapper>
          <DropDownList additionalThumbnailString=' доставки' variants={['жыж', 'сись', 'сус']}/>
        </StyledOrderPageDropdownWrapper>
        <DeliveryForms />
      </Block>
    </PageWrapper>
  )
}