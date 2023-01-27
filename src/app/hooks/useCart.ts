
import { useAppSelector } from '../store/configureStore';
const useCart = () => {
    const { cart, status } = useAppSelector(state => state.cart);
    const subtotal = cart?.items.reduce((sum, item) => sum + (item.amount * item.price), 0) ?? 0;
    const itemCount = cart?.items.reduce((sum, item) => sum + item.amount, 0) ?? 0;
    const deliveryFree = subtotal > 10000 ? 0 : 50;
    
  return {
    cart ,
    status ,
    deliveryFree ,
    subtotal ,
    itemCount
  };
}

export default useCart