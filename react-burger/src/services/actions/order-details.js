import { postOrder } from '../../utils/api';
import { SET_MODAL } from './modal'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const renderOrder = (orderId) => async dispatch => {
    dispatch({ type: GET_ORDER_REQUEST });
    postOrder(orderId)
        .then(res => {
            dispatch({ type: GET_ORDER_SUCCESS, payload: res });
            dispatch({ type: SET_MODAL, payload: res, content: 'order' });
        })
        .catch(() => dispatch({ type: GET_ORDER_FAILED }));
}
