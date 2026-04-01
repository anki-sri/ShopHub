import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/ProductPage/Products';
import Cart from './components/CartPage/Cart';
import ProductDetails from './components/ProductPage/ProductDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PrivateRoute from './components/Routes/PrivateRoute';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
