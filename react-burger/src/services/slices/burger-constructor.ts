import { createSlice } from "@reduxjs/toolkit";
import { TBurgerConstructorState } from "../../utils/types";

const initialState: TBurgerConstructorState = {
    bun: {
        calories: 0,
		carbohydrates: 0,
		fat: 0,
		image: '',
		image_large: '',
		image_mobile: '',
		name: '',
		price: 0,
		proteins: 0,
		type: "bun",
		__v: 0,
		_id: ''
    },
    ingridients: []
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addBun: (state, action) => { state.bun = action.payload },
        addFilling: (state, action) => { state.ingridients.push(action.payload) },
        removeFilling: (state, action) => { return { ...state, ingridients: [...state.ingridients].filter(item => item.uniqueId !== action.payload) } },
        swapFilling: (state, action) => {
            state.ingridients.splice(action.payload.toIndex, 0, ...state.ingridients.splice(action.payload.fromIndex, 1))
        },
        resetConstructor: state => {
            state.bun = initialState.bun;
            state.ingridients = [];
        }
    }
})

export const { addBun, addFilling, removeFilling, swapFilling, resetConstructor } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer