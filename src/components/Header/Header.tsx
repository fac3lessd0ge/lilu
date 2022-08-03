import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { NavButton } from "./NavButton";

const StyledHeader = styled.header`
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: var(--headerColor);
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 5;
`;

export const Header: React.FC = () => {
  const location = useLocation();

  return (
    <StyledHeader>
      {location.pathname !== '/' && (
        <>
          <NavButton type='back'>
            <span>Назад</span>
          </NavButton>
          <NavButton type='menu'>
            <span>Меню</span>
          </NavButton>
        </>
      )}
    </StyledHeader>
  )
}