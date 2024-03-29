import { FC } from 'react';
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { NavButton } from "./NavButton";
import {ReactComponent as LILULogo} from '../../assets/LILU-LOGO-NEW2021.svg';

const StyledHeader = styled.header`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--headerColor);
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 15;
`;

export const Header: FC = () => {
  const location = useLocation();

  return (
    <StyledHeader>
      {location.pathname !== '/' ? (
        <>
          <NavButton type='back'>
            <span>Назад</span>
          </NavButton>
          <NavButton type='menu'>
            <span>Меню</span>
          </NavButton>
        </>
      ) : (
        <LILULogo />
      )}
    </StyledHeader>
  )
}