import { Route, Routes } from "react-router-dom";
import ProductList from '../../features/product/ProductList';
import HomePage from '../../features/home/HomePage';

import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import ProductDetail from '../../features/product/ProductDetail';
import CartPage from '../../features/cart/CartPage';
import AccountPage from '../../features/account/AccountPage';
import { PrivateLogin, PrivateRoute } from "../layout/PrivateRoute";
import ProductFavorite from "../../features/product/ProductFavorite";
import Dashboard from "../../features/private/Dashboard";
import MainPrivate from "../../features/private/MainPrivate";

export const mainRoutes = <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/login' element={
        <PrivateLogin>
            <Login />
        </PrivateLogin>
    } />
    <Route path='/register' element={
        <PrivateLogin>
            <Register />
        </PrivateLogin>
    } />
    <Route element={<PrivateRoute />} >
        <Route path='/cart' element={<CartPage />} />
        <Route path='/account' element={<AccountPage />} />
    </Route>
    {/* roles={["admin" , "seller"]}  */}
    <Route element={<PrivateRoute />} >
        <Route path='/admin/main' element={<MainPrivate />} />
    </Route>
    <Route path='/product-favorite' element={<ProductFavorite />} />
    <Route path='/product-list' element={<ProductList />} />
    <Route path='/product-detail/:idProduct' element={<ProductDetail />} />
</Routes>