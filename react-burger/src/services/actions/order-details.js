import { BASE_URL } from "../../utils/constants";
import { SET_MODAL } from './modal'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const setOrder = (orderId) => async dispatch => {
    try {
        dispatch({ type: GET_ORDER_REQUEST });
        const res = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ingredients: orderId
            })
        });
        const data = await res.json();
        dispatch({ type: GET_ORDER_SUCCESS, payload: data });
        dispatch({ type: SET_MODAL, payload: data, content: 'order' });
    }
    catch {
        dispatch({ type: GET_ORDER_FAILED });
    }
}
