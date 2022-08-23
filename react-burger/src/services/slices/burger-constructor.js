import { createSlice } from "@reduxjs/toolkit";

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: [],
        ingridients: []
    },
    reducers: {
        addBun: (state, action) => { state.bun = action.payload },
        addFilling: (state, action) => { state.ingridients.push(action.payload) },
        removeFilling: (state, action) => { return { ...state, ingridients: [...state.ingridients].filter(item => item.uniqueId !== action.payload) } },
        swapFilling: (state, action) => {
            state.ingridients.splice(action.payload.toIndex, 0, ...state.ingridients.splice(action.payload.fromIndex, 1))
        },
        resetConstructor: state => {
            state.bun = [];
            state.ingridients = [];
        }
    }
})

export const { addBun, addFilling, removeFilling, swapFilling, resetConstructor } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer