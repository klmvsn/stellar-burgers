import { configureStore } from "@reduxjs/toolkit";
import burgerIngridientsReducer from './slices/burger-ingridients';
import burgerConstructorReducer from './slices/burger-constructor';
import modalReducer from './slices/modal';
import orderDetailsReducer from './slices/order-details';
import thunk from "redux-thunk";
import authReducer from './slices/auth';
import ordersReducer from "./slices/orders";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { WS_ORDERS, WS_ORDERS_ALL } from "../utils/constants";
import { WS_AUTH_CONNECTION_START, WS_CLOSE, WS_CONNECTION_START, WS_SEND_MESSAGE } from "./actions/wsActions";

const wsActions = {
    wsConnectionOpen: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    wsClose: WS_CLOSE,
}
const wsAuthActions = {
    wsConnectionOpen: WS_AUTH_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    wsClose: WS_CLOSE
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
    middleware: [thunk,
        socketMiddleware(WS_ORDERS_ALL, wsActions, false),
        socketMiddleware(WS_ORDERS, wsAuthActions, true)],
    devTools: process.env.NODE_ENV !== 'production',

})