import { useEffect } from 'react'
import { addressSelectors, fetchAddressesAsync } from '../../features/address/addressSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

const useAddress = () => {
  const { addressLoaded } = useAppSelector(state => state.address);
  const { account } = useAppSelector(state => state.account);
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(addressSelectors.selectAll);
  useEffect(() => {
    if (!addressLoaded) dispatch(fetchAddressesAsync({ accountId: account?.id }));
  }, [addressLoaded, dispatch]);

  return {
    addresses: addresses
  };
}

export default useAddress