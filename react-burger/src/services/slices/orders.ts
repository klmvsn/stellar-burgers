import { createSlice } from "@reduxjs/toolkit";
import { TOrdersState } from "../../utils/types";

const initialState: TOrdersState = {
    wsConnected: false,
    error: undefined,
    orders: [],
    total: 0,
    totalToday: 0
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        wsConnectionSuccess: state => { state.wsConnected = true },
        wsConnectionError: (state, action) => {
            state.wsConnected = false;
            state.error = action.payload;
        },
        wsConnectionClosed: state => {
            state.wsConnected = false;
            state.error = undefined;
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
        wsOnMessage: (state, action) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
})

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsOnMessage } = ordersSlice.actions;
export default ordersSlice.reducer