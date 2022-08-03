import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { CategoriesPage } from './pages/CategoriesPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<CategoriesPage />} />
        <Route path='baza' element={<>База</>} />
        <Route path='ne_baza' element={<>Не база</>} />
        <Route path='*' element={<>Ошибка 404</>} />
      </Route>
    </Routes>
  );
}

export default App;
