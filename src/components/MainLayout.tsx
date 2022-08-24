import * as React from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';



const MainContentWrapper = styled.div`
  min-height: calc(100vh - 110px);
  max-width: 100vw;
  padding: 10px 15px;
  text-overflow: ellipsis;
  overflow: hidden;
`;



export const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <MainContentWrapper>
        <Outlet />
      </MainContentWrapper>
      <Footer />
    </>
  )
};