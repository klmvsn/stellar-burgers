import { createSlice } from "@reduxjs/toolkit";

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        wsConnected: false,
        error: undefined,
        orders: [],
        total: 0,
        totalToday: 0
    },
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
        wsGetOrders: (state, action) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    }
})

export const { wsConnectionSuccess, wsConnectionError, wsConnectionClosed, wsGetOrders} = ordersSlice.actions;
export default ordersSlice.reducer