import { getCookie } from "../../utils/cookie";
import { wsConnectionClosed, wsConnectionError, wsConnectionSuccess, wsGetOrders } from "../slices/orders";

export const socketMiddleware = (wsUrl, wsActions, isAuth = false) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsConnectionOpen, wsSendMessage, wsClose } = wsActions
            const accessToken = getCookie('token');
            if (type === wsConnectionOpen) {
                socket = !isAuth ? new WebSocket(wsUrl) : new WebSocket(`${wsUrl}?token=${accessToken}`)
            } else if (socket && type === wsClose) {
                socket.close(1000);
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
                    if (event.wasClean) {
                        dispatch(wsConnectionClosed());
                    }
                    else {
                        dispatch(wsConnectionError('Ошибка'));
                        dispatch(wsConnectionClosed(event));
                    }
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