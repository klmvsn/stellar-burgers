import { postOrder } from '../../utils/api';
import { RESET_CONSTRUCTOR } from './burger-constructor';
import { SET_MODAL } from './modal'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const renderOrder = (orderId, setLoading) => async dispatch => {
    dispatch({ type: GET_ORDER_REQUEST });
    setLoading(true);
    postOrder(orderId)
        .then(res => {
            dispatch({ type: GET_ORDER_SUCCESS, payload: res });
            dispatch({ type: SET_MODAL, payload: res, content: 'order' });
            dispatch({type: RESET_CONSTRUCTOR});
        })
        .catch(() => dispatch({ type: GET_ORDER_FAILED }))
        .finally(() => setLoading(false));
}
