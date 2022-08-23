import * as React from 'react';
import styled from 'styled-components';

const AmountWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  width: 100%;
  margin: 0 auto;
  height: 40px;
  max-width: 400px;
  font-weight: 700;
  font-size: 26px;

`;

const AmountButton = styled.button`
  display: grid;
  place-items: center;
  border: none;
  border-radius: 5px;
  background-color: #eee;
  font-weight: 700;
  font-size: 26px;
  transition: transform 0.05s ease-in;

  &:active {
    transform: translateY(4px);
  }
`;

const AmountSpan = styled.span`
  display: flex;
  justify-content: center;
  gap: 3px;
  align-items: center;
  
  &::after {
    content: ' шт.';
    font-size: 20px;
  }
`;

interface IAmountMeter {
  onChange: React.Dispatch<React.SetStateAction<number>>
} 

export const AmountMeter : React.FC<IAmountMeter> = ({ onChange }) => {
  const [value, setValue] = React.useState(0); 

  const plusClickHandler = () => {
    setValue(() => value + 1)
  }

  const minusClickHandler = () => {
    if (value >= 1) {
      setValue(() => value - 1);
    }
  }

  React.useEffect(() => {
    onChange(value);
  }, [value, onChange])

  return (
    <AmountWrapper>
      <AmountButton onClick={minusClickHandler}>-</AmountButton>
      <AmountSpan>{value}</AmountSpan>
      <AmountButton onClick={plusClickHandler}>+</AmountButton>
    </AmountWrapper>
  )
}