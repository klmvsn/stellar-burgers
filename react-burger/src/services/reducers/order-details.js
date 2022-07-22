import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../actions/order-details";

const initialState = {
    info: {
        name: '',
        order: {
            number: null
        },
        success: false
    },
    isLoading: false,
    hasError: false
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {...state, isLoading: true}
        case GET_ORDER_SUCCESS:
            return {...state, isLoading: false, info: action.payload}
        case GET_ORDER_FAILED:
            return {...state, isLoading: false, hasError: true}
        default:
            return state
    }
}