import { SET_INGRIDIENT_MODAL, RESET_INGRIDIENT_MODAL } from "../actions/ingridient-details";

export const initialState = {
    isModalOpen: false,
    ingridient: null
}

export const ingridientDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_INGRIDIENT_MODAL:
            return {...state, isModalOpen: true, ingridient: {...action.payload}};
        case RESET_INGRIDIENT_MODAL:
            return {...state, isModalOpen: false, ingridient: null};
        default:
            return state;
    }
}