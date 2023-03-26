import { useAppDispatch, useAppSelector } from './../store/configureStore';
import { useEffect, useReducer, useState } from 'react'
import { fetchProductStatisticsAsync, fetchSalesStatisticsAsync } from "../store/reportSlice";
import { RequestProductStatistics, RequestSalesStatistics, TypeProductStatisticsRequest, TypeSalesStatisticsRequest } from '../models/Report';



interface ActionProductStatistics {
    type: TypeProductStatisticsRequest;
    payload: any;
};

interface ActionSalesStatistics {
    type: TypeSalesStatisticsRequest;
    payload: any;
};

const updateProductStatistic = (state: RequestProductStatistics, action: ActionProductStatistics) => {
    const { type, payload } = action;
    switch (type) {
        case TypeProductStatisticsRequest.DateStart:
            return {
                ...state,
                dateStart: payload,
            };
        case TypeProductStatisticsRequest.DateEnd:
            return {
                ...state,
                dateEnd: payload,
            };
        default:
            return state;
    }
};

const updateSalesStatistic = (state: RequestSalesStatistics, action: ActionSalesStatistics) => {
    const { type, payload } = action;
    switch (type) {
        case TypeSalesStatisticsRequest.DateYear:
            return {
                ...state,
                year: payload,
            };

        default:
            return state;
    }
};

const useReport = () => {
    const dispatch = useAppDispatch();
    const { account } = useAppSelector(state => state.account);
    

    const infoProductStatistic: RequestProductStatistics = {
        accountId: account?.id,
        dateEnd: "1/1/0544 0:00:00",
        dateStart: "1/1/0544 0:00:00",
    };
    
    const infoSalesStatistic: RequestSalesStatistics = {
        accountId: account?.id,
        year: null
    };

    const [stateProduct, dispatchProduct] = useReducer(updateProductStatistic, infoProductStatistic);
    const [stateSales, dispatchSales] = useReducer(updateSalesStatistic, infoSalesStatistic);

    const {
        productStatistics,
        productStatisticsLoaded,
        salesStatistics,
        salesStatisticsLoaded
    } = useAppSelector(state => state.report);

    useEffect(() => {
        dispatch(fetchProductStatisticsAsync(stateProduct));
    }, [dispatch, productStatisticsLoaded, stateProduct]);

    useEffect(() => {
       dispatch(fetchSalesStatisticsAsync(stateSales));
    }, [dispatch, salesStatisticsLoaded, stateSales]);

    return {
        productStatistics,
        salesStatistics,
        dispatchProduct,
        dispatchSales,
        stateProduct,
        stateSales,
    }
}

export default useReport