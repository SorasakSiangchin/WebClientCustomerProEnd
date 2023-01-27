import { Fragment, useEffect, useCallback } from 'react';
import {
  useNavigate
} from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { fetchCurrentAccount, logout, setTing, setUp } from '../../features/account/accountSlice';
import { fetchCartAsync } from '../../features/cart/cartSlice';
import { mainRoutes } from '../routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../App.css";
function App() {
  const { token, tokenExpirationDate } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let logoutTimer: any;

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

  useEffect(() => {
    // JSON.parse => แปลงข้อความ String ต่างๆ ให้เป็น JSON
    const storedData = JSON.parse(localStorage.getItem("account") || '{}');
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date() // เช็คว่าวันเวลาที่เราเก็บมันมากกว่าเวลาปัจจุบันหรือป่าว ถ้ามากกว่าแสดงว่า Token ยังไม่หมดอายุ
    ) {
      dispatch(
        setTing(
          { account: storedData.account, token: storedData.token, expirationDate: new Date(storedData.expiration) } as setUp
        )
      );
    }
  }, [setTing]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();// จะได้เวลาที่จะหมดอายุของ Token
      logoutTimer = setTimeout(() => {
        dispatch(logout());
        navigate("/");
      }, remainingTime);
    } else clearTimeout(logoutTimer);

  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <Fragment>
      <Header />
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
      <Footer />
    </Fragment>
  )
}

export default App
