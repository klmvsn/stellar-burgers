import { SET_MODAL, RESET_MODAL } from "../actions/modal";

const initialState = {
    isModalOpen: false,
    data: null, 
    type: ''
}

export const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_MODAL:
            return {...state, isModalOpen: true, data: action.payload, type: action.content};
        case RESET_MODAL:
            return {...state, isModalOpen: false, data: null, type: ''};
        default:
            return state;
    }
}