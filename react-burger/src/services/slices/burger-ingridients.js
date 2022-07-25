import { createSlice } from "@reduxjs/toolkit";

export const burgerIngridientsSlice = createSlice({
    name: 'burgerIngridients',
    initialState: {
        ingridients: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        getRequest: state => {state.isLoading = true},
        requestSuccessed: (state, action) => {
            state.isLoading = false; 
            state.ingridients = action.payload
        },
        requestFailed: state => {
            state.isLoading = false;
            state.hasError = true
        }
    }
})

export const {getRequest, requestSuccessed, requestFailed} = burgerIngridientsSlice.actions;
export default burgerIngridientsSlice.reducer