import { configureStore } from "@reduxjs/toolkit";
import burgerIngridientsReducer from './slices/burger-ingridients';
import burgerConstructorReducer from './slices/burger-constructor';
import modalReducer from './slices/modal';
import orderDetailsReducer from './slices/order-details';
import thunk from "redux-thunk";
import { applyMiddleware } from "@reduxjs/toolkit";
import authReducer from './slices/auth';
import ordersReducer from "./slices/orders";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { WS_ORDERS, WS_ORDERS_ALL } from "../utils/constants";
import { WS_AUTH_CONNECTION_START, WS_CONNECTION_START, WS_SEND_MESSAGE } from "./actions/wsActions";

const wsActions = {
    wsConnectionOpen: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE
}
const wsAuthActions = {
    wsConnectionOpen: WS_AUTH_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE
}

export const store = configureStore({
    reducer: {
        burgerIngridients: burgerIngridientsReducer,
        burgerConstructor: burgerConstructorReducer,
        modal: modalReducer,
        orderDetails: orderDetailsReducer,
        auth: authReducer,
        orders: ordersReducer
    },
    enhancers: [applyMiddleware(thunk,
        socketMiddleware(WS_ORDERS_ALL, wsActions, false),
        socketMiddleware(WS_ORDERS, wsAuthActions, true))],
    devTools: process.env.NODE_ENV !== 'production',

})