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
import ProductDetailPrivatePage from "../../features/private/product/ProductDetailPrivatePage";
import ProductsSimilar from "../../features/product/ProductsSimilar";
import TestPage from "../../features/TestPage";
import ProductFormPrivate from "../../features/private/product/ProductFormPrivate";
import { RoleInfo } from "../models/Role";
import UserPrivatePage from "../../features/private/user/UserPrivatePage";
import OrderPrivatePage from "../../features/private/order/OrderPrivatePage";
import OrderDetailPrivate from "../../features/private/order/OrderDetailPrivate";
import DeliveryPrivatePage from "../../features/private/delivery/DeliveryPrivatePage";
import DeliveryFormPrivate from "../../features/private/delivery/DeliveryFormPrivate";
import AboutPage from "../../features/about/AboutPage";
import Error404 from "../../features/error404/Error404";
import UserDetailPrivatePage from "../../features/private/user/UserDetailPrivatePage";

export const mainRoutes = <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/about' element={<AboutPage />} />
    <Route path='*' element={<Error404 />} />
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
    <Route element={<PrivateRoute roles={[RoleInfo.admin, RoleInfo.seller]} />} >
        <Route path='/private/dashboard' element={<DashboardPage />} />
        <Route path='/private/user' element={<UserPrivatePage />} />
        <Route path='/private/user/detail/:id' element={<UserDetailPrivatePage />} />
        <Route path='/private/order' element={<OrderPrivatePage />} />
        <Route path='/private/product' element={<ProductPrivatePage />} />
        <Route path='/private/product/detail/:idProduct' element={<ProductDetailPrivatePage />} />
        <Route path='/private/product/form' element={<ProductFormPrivate />} />
        <Route path='/private/delivery' element={<DeliveryPrivatePage />} />
        <Route path='/private/delivery/form/:idOrder' element={<DeliveryFormPrivate />} />
        <Route path='/private/order/detail' element={<OrderDetailPrivate />} />
    </Route>
    <Route path='/product-favorite' element={<ProductFavorite />} />
    <Route path='/product-list' element={<ProductList />} />
    <Route path='/products-similar' element={<ProductsSimilar />} />
    <Route path='/product-detail/:idProduct' element={<ProductDetail />} />
    <Route path='/test' element={<TestPage />} />
</Routes>