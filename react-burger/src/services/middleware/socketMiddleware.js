import { getCookie } from "../../utils/cookie";
import { wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetOrders } from "../slices/orders";

export const socketMiddleware = (wsUrl, wsActions, isAuth = false) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsConnectionOpen, wsSendMessage } = wsActions
            const accessToken = getCookie('token');
            if (type === wsConnectionOpen) {
                socket = !isAuth ? new WebSocket(wsUrl) : new WebSocket(`${wsUrl}?token=${accessToken}`)
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch(wsConnectionSuccess(event));
                }
                socket.onerror = event => {
                    dispatch(wsConnectionError(event));
                }
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch(wsGetOrders(restParsedData));
                }
                socket.onclose = event => {
                    dispatch(wsConnectionClosed(event));
                }
                if (type === wsSendMessage) {
                    const orders = { ...payload };
                    socket.send(JSON.stringify(orders));
                }
            }
            next(action);
        }
    }
}