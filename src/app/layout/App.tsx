import { useEffect, useCallback } from 'react';
import {
  useLocation
} from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchCurrentAccount  } from '../store/accountSlice'; //logout, setTing, setUp
import { fetchCartAsync } from '../../app/store/cartSlice';
import { mainRoutes } from '../routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../App.css";
import { setShowLayout } from '../../app/store/homeSlice';
import { Layout } from 'antd';
import useSiderPrivate from '../hooks/useSiderPrivate';

const App = () => {
  //const { token, tokenExpirationDate } = useAppSelector(state => state.account);
  const { Sider } = useSiderPrivate();
  const { showLayout } = useAppSelector(state => state.home);
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  const location = useLocation();
  // let logoutTimer: any;

  const initApp = useCallback(async () => {
    try {
      // user ปัจจุบันคือไคร
      // ตอนรีเฟรดจะเชตค่าใหม่
      await dispatch(fetchCurrentAccount()).unwrap().then(async (data) => {
        if (data) await dispatch(fetchCartAsync(data.id));
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  /* #region ระบบออกจากระบบอัตโนมัติ */
  // useEffect(() => {
  //   // JSON.parse => แปลงข้อความ String ต่างๆ ให้เป็น JSON
  //   const storedData = JSON.parse(localStorage.getItem("account") || '{}');
  //   if (
  //     storedData &&
  //     storedData.token &&
  //     new Date(storedData.expiration) > new Date() // เช็คว่าวันเวลาที่เราเก็บมันมากกว่าเวลาปัจจุบันหรือป่าว ถ้ามากกว่าแสดงว่า Token ยังไม่หมดอายุ
  //   ) {
  //     dispatch(
  //       setTing(
  //         { account: storedData.account, token: storedData.token, expirationDate: new Date(storedData.expiration) } as setUp
  //       )
  //     );
  //   }
  // }, [setTing]);

  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime =
  //       tokenExpirationDate.getTime() - new Date().getTime();// จะได้เวลาที่จะหมดอายุของ Token
  //     logoutTimer = setTimeout(() => {
  //       dispatch(logout());
  //       navigate("/");
  //     }, remainingTime);
  //   } else clearTimeout(logoutTimer);

  // }, [token, logout, tokenExpirationDate]);
  /* #endregion */

  useEffect(() => {
    initApp();
  }, [initApp]);

  useEffect(() => {
    var obj = JSON.parse(JSON.stringify(location));
    var path = obj.pathname as string;
    if (!path.includes("/private")) dispatch(setShowLayout(true));
    else dispatch(setShowLayout(false));
  }, [location, showLayout]);

  return (
    <Layout style={{ minHeight: '100vh' }} className="site-layout">
      {showLayout ? <Header /> : Sider}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {mainRoutes}
      {showLayout ? <Footer /> : ""}
    </Layout>
  )
}

export default App
