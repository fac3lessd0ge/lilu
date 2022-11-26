import * as React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { GrCatalog } from 'react-icons/gr';
import styled from 'styled-components';
import { useDelayedNavigation } from '../../hooks/useDelayedNavigation';

interface NavButtonProps {
  type: 'back' | 'menu';
  children: React.ReactNode;
}

const StyledNavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  background-color: #ffec99;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccccccad;
  border-radius: 5px;
  padding: 4px 5px;
  transition: all 0.03s linear;
  outline: none;
  font-size: 14px;
  font-weight: 700;

  &:active {
    box-shadow: none;
    transform: translateY(2px);
  }
`;

export const NavButton: React.FC<NavButtonProps> = ({ type, children }) => {
  const navigate = useDelayedNavigation(200);

  const clickHandler = () => {
    if (type === 'back') {
      return navigate();
    }
    navigate('/');
  };

  return (
    <StyledNavButton onClick={clickHandler}>
      {type === 'back' && <IoIosArrowBack size={18} />}
      {type === 'menu' && <GrCatalog size={18} />}
      {children}
    </StyledNavButton>
  );
};
