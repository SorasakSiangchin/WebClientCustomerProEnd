import { useAppDispatch } from './../store/configureStore';
import { useAppSelector } from "../store/configureStore";
import { useEffect } from 'react';
import { fetchOrdersAsync, orderSelectors, resetOrder, resetParams } from '../store/orderSlice';
import { Result } from '../models/Interfaces/IResponse';
import agent from '../api/agent';

const useOrder = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(orderSelectors.selectAll);
    const { ordersLoaded, metaData } = useAppSelector(state => state.order);

    useEffect(() => {
        if (!ordersLoaded) dispatch(fetchOrdersAsync());
    }, [dispatch, ordersLoaded]);

    useEffect(() => {
        return () => {
            dispatch(resetOrder());
            dispatch(resetParams());
        }
    }, [dispatch]);
    const getEvidenceMoneyTransfers = async (orderId: any) => {
        const { isSuccess, statusCode, result }: Result = await agent.EvidenceMoneyTransfer.get(orderId);
        if (isSuccess === true && statusCode === 200) return result;
        return null;
    };

    return {
        orders,
        ordersLoaded,
        resetOrder,
        getEvidenceMoneyTransfers,
        metaData
    };
}

export default useOrder;