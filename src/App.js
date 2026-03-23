import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/ProductPage/Products';
import Cart from './components/CartPage/Cart';
import ProductDetails from './components/ProductPage/ProductDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
