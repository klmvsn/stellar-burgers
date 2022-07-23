import { GET_INGRIDIENTS_FAILED, GET_INGRIDIENTS_REQUEST, GET_INGRIDIENTS_SUCCESS } from "../actions/burger-ingridients";

const initialState = {
    ingridients: [],
    isLoading: false,
    hasError: false
}

export const burgerIngridientsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGRIDIENTS_REQUEST: 
            return {...state, isLoading: true};
        case GET_INGRIDIENTS_SUCCESS:
            return {...state, ingridients: action.payload, isLoading: false};
        case GET_INGRIDIENTS_FAILED:
            return {...state, isLoading: false, hasError: true};
        default:
            return state;
    }
}