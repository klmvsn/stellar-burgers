import { createSlice } from "@reduxjs/toolkit";

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState: {
        bun: [],
        ingridients: []
    },
    reducers: {
        addBuns: (state, action) => {state.bun = action.payload},
        addFilling: (state, action) => {state.ingridients.push(action.payload)},
        removeFilling: (state, action) => {state.ingridients.filter(item => item.uniqueId !== action.payload)},
        swapFilling: (state, action) => {
            state.ingridients = state.ingridients.splice(action.payload.dragIndex, 1, 
                state.ingridients.splice(action.payload.hoverIndex, 1, action.payload.item)[0])
        }
    }
})

export const {addBuns, addFilling, removeFilling, swapFilling} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer