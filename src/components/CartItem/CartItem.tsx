import { stringify } from 'querystring';
import * as React from 'react';
import styled from 'styled-components';
import { ICartItem } from '../../redux/api/cart';
import { AmountMeter } from '../AmountMeter/AmountMeter';

const StyledCartItemWrapper = styled.div`
  padding: 3px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 60px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
`;

const StyledItemTitle = styled.p`
  max-width: 70%;
  line-height: 18px;
  display: flex;
  align-items: center;
  height: 60px;
  overflow: hidden;
  margin: 0;

  &::first-letter {
    text-transform: capitalize;
  }
`;

const StyledVariantTitle = styled.p`
  font-size: 14px;
`;

const StyledAmountMeterWrapper = styled.div`
  max-width: 30%;
  min-width: 150px;
  position: absolute;
  right: 15px;
`;

const toCapitalizedLowerCase = (str: string, maxLen: number): string => {
  return str.charAt(0).toUpperCase() + str.slice(1, maxLen).toLowerCase()
}

export const CartItem : React.FC<ICartItem> = ({ amount, chosen_variant = 'лаймовый', price, title }) => {
  const prepareTitle = React.useCallback((str: string, maxLen: number): string => {
    return toCapitalizedLowerCase(str, maxLen) + (str.length > maxLen ? '...' : '') 
  }, [])
  
  return (
    <StyledCartItemWrapper>
      <StyledItemTitle>{prepareTitle(title, 45)}</StyledItemTitle> 
      
      <StyledAmountMeterWrapper>
        <AmountMeter 
          fontSize='20px'
          initValue={amount} 
          onChange={() => console.log('yay')}
        />
      </StyledAmountMeterWrapper>
    
    </StyledCartItemWrapper>
  )
}