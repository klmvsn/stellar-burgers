import { configureStore } from "@reduxjs/toolkit";
import burgerIngridientsReducer from './slices/burger-ingridients';
import burgerConstructorReducer from './slices/burger-constructor';
import modalReducer from './slices/modal';
import orderDetailsReducer from './slices/order-details';
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
import authSlice from './slices/auth';

export const store = configureStore({
    reducer:{
        burgerIngridients: burgerIngridientsReducer,
        burgerConstructor: burgerConstructorReducer,
        modal: modalReducer,
        orderDetails: orderDetailsReducer,
        auth: authSlice
    },
    enhancers: [applyMiddleware(thunk)],
    devTools: process.env.NODE_ENV !== 'production',

})