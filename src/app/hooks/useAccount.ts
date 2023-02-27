import { useAppDispatch } from './../store/configureStore';
import { useEffect } from 'react'
import { accountSelectors, fetchAccountsAsync } from '../store/accountSlice';
import { useAppSelector } from '../store/configureStore';

const useAccount = () => {
    const dispatch = useAppDispatch();
    const accounts = useAppSelector(accountSelectors.selectAll); // ตัวสินค้า
    const {
        accountsLoaded
    } = useAppSelector(state => state.account);//

    useEffect(() => {
        if (!accountsLoaded) dispatch(fetchAccountsAsync());
    }, [accountsLoaded, dispatch]);
    return {
        accounts
    }
}

export default useAccount