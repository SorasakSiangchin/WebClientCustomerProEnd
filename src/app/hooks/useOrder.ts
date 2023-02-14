import { useAppDispatch } from './../store/configureStore';
import { useAppSelector } from "../store/configureStore";
import { useEffect } from 'react';
import { fetchOrderByIdAccountAsync, orderSelectors, resetOrder } from '../store/orderSlice';

const useOrder = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(orderSelectors.selectAll);
    const { ordersLoaded } = useAppSelector(state => state.order);
    const { account } = useAppSelector(state => state.account);

    useEffect(() => {
        if (!ordersLoaded) dispatch(fetchOrderByIdAccountAsync(account?.id));
        return () => {
            dispatch(resetOrder()) ;
        }
    }, [dispatch]);

    return {
        orders,
        ordersLoaded
    };
}

export default useOrder;