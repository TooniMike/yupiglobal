import React from 'react'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Product from './pages/Product.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Signup from './pages/Signup.jsx';
import store from './redux/store.js';
import Cartscreen from './components/Cartscreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path='/products' element={<Product />} />
      <Route path='/products/:id' element={<ProductDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='cart' element={<Cartscreen />} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)
