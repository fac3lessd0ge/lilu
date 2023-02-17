import * as React from 'react';
import styled from 'styled-components';
import { TiPlus, TiMinus } from 'react-icons/ti';

interface IAmountMeterWrapper {
  height: string;
  fontSize: string;
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
  background-color: #fff;
  color: #000;
  font-weight: 700;
  font-size: 26px;
  transition: all 0.05s ease;
  border: 2px solid #ccc3;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  &:active {
    transform: translateY(4px);
    box-shadow: none;
    border: 2px solid rgba(0, 0, 0, 0.1);
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
  onChange: React.Dispatch<React.SetStateAction<number>> | Function;
  height?: string;
  initValue?: number;
  fontSize?: string;
  max: number;
}

export const AmountMeter: React.FC<IAmountMeter> = ({
  onChange,
  height = '40px',
  initValue = 0,
  fontSize = '26px',
  max = 0,
}) => {
  const [value, setValue] = React.useState(initValue);

  const plusClickHandler = () => {
    if (value + 1 <= max) {
      setValue(() => value + 1);
    }
  };

  const minusClickHandler = () => {
    if (value >= 1) {
      setValue(() => value - 1);
    }
  };

  React.useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <AmountWrapper fontSize={fontSize} height={height}>
      <AmountButton onClick={minusClickHandler}>
        <TiMinus size={22} />
      </AmountButton>
      <Center>
        <AmountSpan>{value}</AmountSpan>
      </Center>
      <AmountButton onClick={plusClickHandler}>
        <TiPlus size={24} />
      </AmountButton>
    </AmountWrapper>
  );
};
