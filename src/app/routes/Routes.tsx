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
import DashboardPage from "../../features/private/DashboardPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ProductPrivatePage from "../../features/private/product/ProductPrivatePage";
import ProductDetailPrivate from "../../features/private/product/ProductDetailPrivate";
import ProductsSimilar from "../../features/product/ProductsSimilar";
import TestPage from "../../features/TestPage";

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
        <Route path='/checkout' element={<CheckoutPage />} />
    </Route>
    <Route element={<PrivateRoute roles={["admin" , "seller"]} />} >
        <Route path='/private/dashboard' element={<DashboardPage />} />
        <Route path='/private/product' element={<ProductPrivatePage />} />
        <Route path='/private/product/detail' element={<ProductDetailPrivate />} />
    </Route>
    <Route path='/product-favorite' element={<ProductFavorite />} />
    <Route path='/product-list' element={<ProductList />} />
    <Route path='/products-similar' element={<ProductsSimilar />} />
    <Route path='/product-detail/:idProduct' element={<ProductDetail />} />
    <Route path='/test' element={<TestPage />} />
</Routes>