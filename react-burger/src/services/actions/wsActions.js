export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';
export const WS_AUTH_CONNECTION_START = 'WS_AUTH_CONNECTION_START';

export const wsConnectionOpen =() => {
    return {
        type: WS_CONNECTION_START
    };
}

export const wsAuthConnectionOpen = () => {
    return {
        type: WS_AUTH_CONNECTION_START
    };
}

export const wsSendMessage = (order) => {
    return {
        type: WS_SEND_MESSAGE,
        payload: order
    }
}