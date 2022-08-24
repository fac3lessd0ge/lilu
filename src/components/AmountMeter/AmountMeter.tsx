import * as React from 'react';
import styled from 'styled-components';

interface IAmountMeterWrapper {
  height: string,
  fontSize: string 
}

const AmountWrapper = styled.div<IAmountMeterWrapper>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 5px;
  width: 100%;
  margin: 0 auto;
  height: ${({ height }) => height || '40px'};
  max-width: 400px;
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize};
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
  gap: 3px;
  &::after {
    content: ' шт.';
    font-size: 60%;
  }
  `;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
`;

interface IAmountMeter {
  onChange: React.Dispatch<React.SetStateAction<number>>,
  height?: string;
  initValue?: number,
  fontSize?: string
} 

export const AmountMeter : React.FC<IAmountMeter> = ({ onChange, height = '40px', initValue = 0, fontSize = '26px' }) => {
  const [value, setValue] = React.useState(initValue); 

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
    <AmountWrapper fontSize={fontSize} height={height}>
      <AmountButton onClick={minusClickHandler}>-</AmountButton>
      <Center>
        <AmountSpan>{value}</AmountSpan>
      </Center>
      <AmountButton onClick={plusClickHandler}>+</AmountButton>
    </AmountWrapper>
  )
}