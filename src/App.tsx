
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { CartPage } from './pages/CartPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ItemPage } from './pages/ItemPage';
import { ItemsPage } from './pages/ItemsPage';
import { OrderPage } from './pages/OrderPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CategoriesPage />} />
        <Route path="category/:id" element={<ItemsPage />} />
        <Route path="item/:id/" element={<ItemPage />} />
        <Route path="item/:id/:type_id" element={<ItemPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="*" element={<>Ошибка 404</>} />
      </Route>
    </Routes>
  );
}

export default App;
