import * as React from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './Header/Header';



const MainContentWrapper = styled.div`
  min-height: calc(100vh - 130px);
  max-width: 100vw;
  padding: 10px 20px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledFooter = styled.footer`
  height: 60px;
  background-color: var(--footerColor);
  position: sticky;
  bottom: 0;
  color: white;
  text-align: center;
  text-transform: capitalize;
  display: grid;
  place-items: center;
`;

export const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
      <StyledFooter>
        В Корзину
      </StyledFooter>
    </>
  )
};