import { postOrder } from '../../utils/api';
import { AppDispatch } from '../../utils/types';
import { resetConstructor } from '../slices/burger-constructor';
import { setModal } from '../slices/modal';
import { getFailed, getRequest, getSuccessed } from '../slices/order-details';


export const renderOrder = (orderId: string[], setLoading: (arg0: boolean) => void) => (dispatch: AppDispatch) => {
    dispatch(getRequest());
    setLoading(true);
    postOrder(orderId)
        .then(res => {
            dispatch(getSuccessed(res));
            dispatch(setModal({ res, content: 'order' }));
            dispatch(resetConstructor());
        })
        .catch(() => dispatch(getFailed()))
        .finally(() => setLoading(false));
}
