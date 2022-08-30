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

const StyledOrderPageVariantsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

const StyledOrderVariant = styled.button`
  width: 100%;
  height: 60px;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #ccc3;
  display: flex;
  align-items: center;
  transition: all 0.1s ease;

  &:active {
    transform: translateY(4px);
    border: 2px solid rgba(0, 0, 0, 0.1);
  }
`;

const OrderVariants = ['Самовывоз из магазина', 'Почта России', 'ЕМС Почта России']

export const OrderPage: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = React.useState<string>(OrderVariants[0]);

  return (
    <PageWrapper>
      <Block>
        <StyledOrderPageTitle>Оформление заказа</StyledOrderPageTitle>
        <StyledOrderPageVariantsWrapper>
          {OrderVariants.map(elem => (
            <StyledOrderVariant 
              key={elem}
              onClick={(e) => setSelectedVariant(elem)}
              >
                {elem}
            </StyledOrderVariant>
          ))}
        </StyledOrderPageVariantsWrapper>
        <DeliveryForms variant={selectedVariant === 'Самовывоз из магазина' ? 'pickup' : 'post'}/>
      </Block>
    </PageWrapper>
  )
}