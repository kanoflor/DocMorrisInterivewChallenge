import { useDispatch } from 'react-redux';
import { updateQuantity } from '../../../store/slices/cart';

export const useQuantitySelector = (
  itemId: string,
  currentQuantity: number,
) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: itemId, qty: currentQuantity + 1 }));
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id: itemId, qty: currentQuantity - 1 }));
    }
  };

  return {
    handleIncrease,
    handleDecrease,
  };
};
