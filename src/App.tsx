import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { CartPage } from './pages/CartPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ItemPage } from './pages/ItemPage';
import { ItemsPage } from './pages/ItemsPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<CategoriesPage />} />
        <Route path='category/:id' element={<ItemsPage />} />
        <Route path='item/:id' element={<ItemPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='*' element={<>Ошибка 404</>} />
      </Route>
    </Routes>
  );
}

export default App;
