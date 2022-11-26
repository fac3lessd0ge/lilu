import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ICartItem, useEditCartItemMutation } from '../../redux/api/cart';
import { AmountMeter } from '../AmountMeter/AmountMeter';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import debounce from 'lodash.debounce';

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
  max-width: calc(100% - 170px);
  line-height: 18px;
  display: flex;
  align-items: center;
  word-break: break-word;
  height: 60px;
  overflow: hidden;
  margin: 0;

  &::first-letter {
    text-transform: capitalize;
  }

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  @media screen and (max-width: 360px) {
    font-size: 14px;
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
  return str.charAt(0).toUpperCase() + str.slice(1, maxLen).toLowerCase();
};

export const CartItem: React.FC<ICartItem> = ({ product, quantity }) => {
  const navigate = useNavigate();

  const { am, name, product_id, product_type_id } = product;

  const [editItem, status] = useEditCartItemMutation();
  const [currentAmount, setCurrentAmount] = React.useState(quantity);

  const clickHandler = debounce((number: number) => {
    setCurrentAmount(number);
    editItem({
      product_id: product_id,
      product_count: number,
    });
  }, 200);

  const prepareTitle = (str: string, maxLen: number): string => {
    return (
      toCapitalizedLowerCase(str, maxLen) + (str.length > maxLen ? '...' : '')
    );
  };

  return (
    <StyledCartItemWrapper>
      <StyledItemTitle
        onClick={() => navigate(`/item/${product_type_id}/${product_id}`)}
      >
        {prepareTitle(name, 40)}
      </StyledItemTitle>

      <StyledAmountMeterWrapper>
        <AmountMeter
          max={am}
          fontSize="20px"
          initValue={currentAmount}
          onChange={clickHandler}
        />
      </StyledAmountMeterWrapper>
    </StyledCartItemWrapper>
  );
};
