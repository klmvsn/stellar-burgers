import { Middleware } from "redux";
import { getCookie } from "../../utils/cookie";
import { TWebSocket, TWsActions } from "../../utils/types";

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions, isAuth: boolean = false): Middleware => {
    return store => {
        let socket: TWebSocket = null;

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
                socket.onopen = () => {
                    dispatch(wsConnectionSuccess());
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
                socket.onclose = () => {
                    dispatch(wsDisconnect());
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