import { ActionCreator, ActionCreatorWithoutPayload, ActionCreatorWithPayload, AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";
import { WS_AUTH_CONNECTION_START, WS_CLOSE, WS_CONNECTION_START, WS_SEND_MESSAGE } from "../services/actions/wsActions";
import { store } from "../services/store";

export type TUser = {
    email: string,
    name: string
}

export type TForm = TUser & {
    password: string,
    code: string,
    resetPassword: string
}

export type TAuthState = {
    user: TUser,
    form: TForm,
    accessToken: string,
    refreshToken: string,
    registerError: boolean,
    isAuth: boolean,
    isLoading: boolean,
    message: string,
    forgetError: boolean,
    forgetSuccess: boolean,
    resetSuccess: boolean,
    resetError: boolean,
    logOutSuccess: boolean,
    logOutError: boolean,
    updateTokenError: boolean,
    error: boolean
}

export type TIngridient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: "bun" | "main" | "sauce";
    __v: number;
    _id: string;
    uniqueId?: string;
    length?: number;
}

export type TIngridientDataResponse = {
    data: Array<TIngridient>;
	success: boolean;
}

export type TBurgerConstructorState = {
    bun: TIngridient,
    ingridients: TIngridient[]
}

export type TBurgerIngridients = {
    ingridients: TIngridient[],
    isLoading: boolean,
    hasError: boolean
}

export type TModal = {
    isModalOpen: boolean,
    data: null | ReactNode,
    type: string
}

export type TModalRender = {
    onClose: () => void,
    children?: ReactNode
}

export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: null | number;
    owner: TUser;
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export type TOrderInfoIngridient = {
    item: TIngridient | undefined,
    count: number | undefined
}

export type TOrderDetails = {
    info: {
        name: string,
        order: {
            number: null | number
        }
        success: boolean
    },
    isLoading?: boolean,
    hasError?: boolean
}

export type TOrdersState = {
    wsConnected: boolean,
    error: undefined | string,
    orders: TOrder[],
    total: number,
    totalToday: number
}

export type TDraggableIngridient = {
    item: TIngridient,
    index: number
}

export type TCategory = {
    type: string,
    name: string
}

export type TIngridientInfo = {
    info: number,
    children: string
}

export type TWsActions = {
    wsConnectionOpen: typeof WS_CONNECTION_START | typeof WS_AUTH_CONNECTION_START,
    wsConnectionSuccess: ActionCreatorWithoutPayload,
    wsOnMessage: ActionCreatorWithPayload<string>,
    wsSendMessage: typeof WS_SEND_MESSAGE,
    wsConnectionError: ActionCreatorWithPayload<Event>,
    wsConnectionClosed: typeof WS_CLOSE,
    wsDisconnect: ActionCreatorWithoutPayload
}

export type TWebSocket = WebSocket | null;

export type RootState = ReturnType<typeof store.getState>;
export const TUseSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, unknown, AnyAction>>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>();


export type TLocationState = {
    background: {
        pathname: string;
        search: string;
        hash: string;
        state: null;
    }
    from: string;
    state?: object;
}