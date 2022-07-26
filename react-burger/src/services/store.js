import { configureStore } from "@reduxjs/toolkit";
import burgerIngridientsReducer from './slices/burger-ingridients';
import burgerConstructorReducer from './slices/burger-constructor';
import modalReducer from './slices/modal';
import orderDetailsReducer from './slices/order-details';
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        burgerIngridients: burgerIngridientsReducer,
        burgerConstructor: burgerConstructorReducer,
        modal: modalReducer,
        orderDetails: orderDetailsReducer
    },
    enhancers: [applyMiddleware(thunk)],
    devTools: process.env.NODE_ENV !== 'production',

})