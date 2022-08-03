import * as React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { GrCatalog } from 'react-icons/gr';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDelayedNavigation } from '../../hooks/useDelayedNavigation';

interface NavButtonProps {
  type: 'back' | 'menu';
  children: React.ReactNode;
}

const StyledNavButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  background-color: #EEE297;
  box-shadow: 1px 1px 1px grey;
  border-radius: 5px;
  padding: 4px 5px;
  transition: all 0.03s ease-in;

  &:active {
    box-shadow: none;
    transform: translateY(3px);
  }
`;

export const NavButton: React.FC<NavButtonProps> = ({ type, children }) => {
  const navigate = useDelayedNavigation(200);

  const clickHandler = () => {
    if (type === 'back') {
      return navigate();
    }
    navigate('/')
  }

  return (
    <StyledNavButton onClick={clickHandler}>
      {type === 'back' && <IoIosArrowBack size={16}/>}
      {type === 'menu' && <GrCatalog size={16}/>}
      {children}
    </StyledNavButton>
  )
}