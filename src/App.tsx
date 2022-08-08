import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { CategoriesPage } from './pages/CategoriesPage';
import { ItemsPage } from './pages/ItemsPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<CategoriesPage />} />
        <Route path='category/:id' element={<ItemsPage />} />
        <Route path='*' element={<>Какая-то категория, тут уже показываются товары</>} />
      </Route>
    </Routes>
  );
}

export default App;
