import { BASE_URL } from "../../utils/constants";

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';

export const getIngridients = () => async dispatch => {
    try {
        dispatch({ type: GET_INGRIDIENTS_REQUEST });
        const res = await fetch(`${BASE_URL}/ingredients`);
        const data = await res.json();
        dispatch({ type: GET_INGRIDIENTS_SUCCESS, payload: data.data })
    }
    catch(err) {
        dispatch({ type: GET_INGRIDIENTS_FAILED });
    }
}
