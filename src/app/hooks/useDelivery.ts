import { useAppDispatch } from './../store/configureStore';
import { useEffect } from 'react';
import { useAppSelector } from '../store/configureStore';
import { fetchStatusDeliverysAsync } from '../store/deliverySlice';
const useDelivery = () => {
    const dispatch = useAppDispatch();
    
    const {
        statusDelivery,
        statusDeliveryLoaded
    } = useAppSelector(state => state.delivery);

    useEffect(() => {
        if (!statusDeliveryLoaded) dispatch(fetchStatusDeliverysAsync());
    }, [statusDeliveryLoaded, dispatch]);

    return {
        statusDelivery
    }
}

export default useDelivery