import { useAppDispatch } from './../store/configureStore';
import { useEffect } from 'react'
import { accountSelectors, fetchAccountsAsync, setParams , resetParams} from '../store/accountSlice';
import { useAppSelector } from '../store/configureStore';

const useAccount = () => {
    const dispatch = useAppDispatch();
    const { metaData } = useAppSelector(state => state.account);
    const accounts = useAppSelector(accountSelectors.selectAll); // ตัวสินค้า
    const {
        accountsLoaded
    } = useAppSelector(state => state.account);//

    useEffect(() => {
        dispatch(fetchAccountsAsync());
    }, [accountsLoaded, dispatch]);
    return {
        accounts,
        metaData,
        setParams,
        resetParams
    }
}

export default useAccount