import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions, isAuth = false) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsConnectionOpen, wsConnectionSuccess, wsOnMessage, wsSendMessage, wsConnectionError, wsConnectionClosed, wsDisconnect } = wsActions
            const accessToken = getCookie('token');
            if (type === wsConnectionOpen) {
                socket = !isAuth ? new WebSocket(wsUrl) : new WebSocket(`${wsUrl}?token=${accessToken}`)
            } else if (type === wsConnectionClosed && socket) {
                socket.close();
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
                    dispatch(wsOnMessage(restParsedData));
                }
                socket.onclose = event => {
                    dispatch(wsDisconnect(event));
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