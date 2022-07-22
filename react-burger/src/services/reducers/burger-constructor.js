import { ADD_BUNS, ADD_FILLING, REMOVE_FILLING, SWAP_FILLING } from "../actions/burger-constructor";

const initialState = {
    bun: [],
    ingridients: []
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUNS:
            return { ...state, bun: action.payload }
        case ADD_FILLING:
            return { ...state, ingridients: [...state.ingridients, action.payload] }
        case REMOVE_FILLING:
            return { ...state, ingridients: [...state.ingridients].filter(item => item.uniqueId !== action.payload) };
        case SWAP_FILLING:
            {
                const newState = [...state.ingridients];
                const prevItem = newState.splice(action.payload.hoverIndex, 1, action.payload.item);
                newState.splice(action.payload.dragIndex, 1, prevItem[0])
                return {
                    ...state,
                    ingridients: newState
                };
            }
        default:
            return state;
    }
}