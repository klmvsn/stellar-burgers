import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { TAuthState, TForm } from "../../utils/types";

const initialState: TAuthState = {
    user: {
        email: '',
        name: ''
    },
    form: {
        email: '',
        password: '',
        name: '',
        code: '',
        resetPassword: ''
    },
    accessToken: '',
    refreshToken: '',
    registerError: false,
    isAuth: false,
    isLoading: false,
    message: '',
    forgetError: false,
    forgetSuccess: false,
    resetSuccess: false,
    resetError: false,
    logOutSuccess: false,
    logOutError: false,
    updateTokenError: false,
    error: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerUserRequest: state => { state.isLoading = true },
        registerUserSuccess: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.isLoading = false;
            state.user = user;
            state.accessToken = accessToken.split('Bearer ')[1];
            state.refreshToken = refreshToken;
            setCookie('token', state.accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        registerUserFailed: state => {
            state.isLoading = false;
            state.registerError = true;
        },
        setFormValue: (state, action: PayloadAction<{field: keyof TForm, value: string}>) => {
            const { field , value } = action.payload;
            state.form[field] = value;
        },
        forgotPasswordRequest: state => { state.isLoading = true; },
        forgotPasswordSuccess: (state, action) => {
            state.isLoading = false;
            state.forgetSuccess = true;
            state.message = action.payload.message;
        },
        forgotPasswordFailed: state => {
            state.isLoading = false;
            state.forgetError = true;
        },
        resetPasswordRequest: state => { state.isLoading = true },
        resetPasswordSuccess: (state, action) => {
            state.isLoading = false;
            state.resetSuccess = true;
            state.message = action.payload.message
        },
        resetPasswordFailed: state => {
            state.isLoading = false;
            state.resetError = true
        },
        signInRequest: state => { state.isLoading = true },
        signInSuccess: (state, action) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.isLoading = false;
            state.user = user;
            state.accessToken = accessToken.split('Bearer ')[1];
            state.refreshToken = refreshToken;
            setCookie('token', state.accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        signInFailed: state => {
            state.isLoading = false;
            state.error = true
        },
        signOutRequest: state => { state.isLoading = true },
        signOutSuccess: state => {
            state.isLoading = false;
            state.logOutSuccess = true;
            state.user = { email: '', name: '' };
            deleteCookie('token');
            localStorage.removeItem('refreshToken');
        },
        signOutFailed: state => {
            state.isLoading = false;
            state.logOutError = true
        },
        getUserRequest: state => { state.isLoading = true },
        getUserSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
        },
        getUserFailed: state => {
            state.isLoading = false;
        },
        updateTokenRequest: state => { state.isLoading = true },
        updateTokenSuccess: (state, action) => {
            state.isLoading = false;
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken.split('Bearer ')[1];
            state.refreshToken = refreshToken;
            setCookie('token', state.accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        updateTokenFailed: state => {
            state.isLoading = false;
            state.updateTokenError = true;
        },
        updateUserRequest: state => { state.isLoading = true },
        updateUserSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
        },
        updateUserFailed: (state,action) => {
            state.isLoading = false;
            state.message = action.payload;
        }
    }
})

export const { registerUserRequest, registerUserSuccess, registerUserFailed, setFormValue,
    forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailed,
    resetPasswordRequest, resetPasswordSuccess, resetPasswordFailed,
    signInRequest, signInSuccess, signInFailed,
    signOutRequest, signOutSuccess, signOutFailed,
    getUserRequest, getUserSuccess, getUserFailed,
    updateTokenRequest, updateTokenSuccess, updateTokenFailed,
    updateUserRequest, updateUserSuccess, updateUserFailed } = authSlice.actions;
export default authSlice.reducer