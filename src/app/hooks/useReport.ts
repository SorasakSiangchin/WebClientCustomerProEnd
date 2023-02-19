import { useAppDispatch, useAppSelector } from './../store/configureStore';
import { useEffect, useReducer } from 'react'
import { fetchProductStatisticsAsync, fetchSalesStatisticsAsync } from "../store/reportSlice";
import { RequestStatistics } from '../models/Report';

export enum TypeRequest {
    DateStart = 'DateStart',
    DateEnd = 'DateEnd',
}
interface Action {
    type: TypeRequest;
    payload: any;
}
const useReport = () => {
    const dispatch = useAppDispatch();
    const { account } = useAppSelector(state => state.account);

    const infoProductStatistic: RequestStatistics = {
        accountId: account?.id,
        dateEnd: null,
        dateStart: null,
    };
    const infoSalesStatistic: RequestStatistics = {
        accountId: account?.id,
        dateEnd: null,
        dateStart: null,
    };
    const updateProductStatistic = (state: RequestStatistics, action: Action) => {
        const { type, payload } = action;
        switch (type) {
            case TypeRequest.DateStart:
                return {
                    ...state,
                    dateStart: payload,
                };
            case TypeRequest.DateEnd:
                return {
                    ...state,
                    dateEnd: payload,
                };
            default:
                return state;
        }
    }
    const [stateProduct, dispatchProduct] = useReducer(updateProductStatistic, infoProductStatistic);



    const {
        productStatistics,
        productStatisticsLoaded,
        salesStatistics,
        salesStatisticsLoaded
    } = useAppSelector(state => state.report);

    useEffect(() => {
        if (!productStatisticsLoaded) dispatch(fetchProductStatisticsAsync(stateProduct));
        //console.log(stateProduct)
    }, [dispatch, productStatisticsLoaded , stateProduct]);

    useEffect(() => {
        if (!salesStatisticsLoaded) dispatch(fetchSalesStatisticsAsync({}));
    }, [dispatch, salesStatisticsLoaded]);

    return {
        productStatistics,
        salesStatistics,
        dispatchProduct,
        stateProduct
    }
}

export default useReport