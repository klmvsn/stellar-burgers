import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, setCookie } from "../../utils/cookie";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
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
        accessToken: null,
        refreshToken: null,
        error: false,
        isAuth: false,
        isLoading: false,
        message: '',
        forgetError: false,
        forgetSuccess: false,
        resetSuccess: false,
        resetError: false,
        logOutSuccess: false,
        logOutError: false
    },
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
            state.error = true;
        },
        setFormValue: (state, action) => {
            const { field, value } = action.payload;
            state.form[field] = value;
        },
        forgotPasswordRequest: state => { state.isLoading = true; },
        forgotPasswordSuccess: (state, action) => {
            state.isLoading = false;
            state.forgetSuccess = true;
            state.message = action.payload.message;
        },
        forgotPasswordFailed: state => { state.isLoading = false; state.forgetError = true; },
        resetPasswordRequest: state => { state.isLoading = true },
        resetPasswordSuccess: (state, action) => {
            state.isLoading = false;
            state.resetSuccess = true;
            state.message = action.payload.message
        },
        resetPasswordFailed: state => { state.isLoading = false; state.resetError = true },
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
        signInFailed: state => { state.isLoading = false; state.error = true },
        signOutRequest: state => { state.isLoading = true },
        signOutSuccess: state => {
            state.isLoading = false;
            state.logOutSuccess = true;
            state.user = '';
            deleteCookie('token');
            localStorage.removeItem('refreshToken', state.refreshToken);
            localStorage.removeItem('isTokenExpired');
        },
        signOutFailed: state => { state.isLoading = false; state.logOutError = true },
        getUserRequest: state => { state.isLoading = true },
        getUserSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            localStorage.removeItem('isTokenExpired');
        },
        getUserFailed: (state, action) => {
            state.isLoading = false;
            if (action.payload.message === 'jwt expired') {
                localStorage.setItem('isTokenExpired', true)
            }
        },
        updateTokenRequest: state => { state.isLoading = true },
        updateTokenSuccess: (state, action) => {
            state.isLoading = false;
            const { accessToken, refreshToken } = action.payload;
            state.accessToken = accessToken.split('Bearer ')[1];
            state.refreshToken = refreshToken;
            setCookie('token', state.accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.removeItem('isTokenExpired');
        },
        updateTokenFailed: state => { state.isLoading = false; },
        updateUserRequest: state => { state.isLoading = true },
        updateUserSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
        },
        updateUserFailed: (state, action) => {
            state.isLoading = false;
            if (action.payload.message === 'jwt expired') {
                localStorage.setItem('isTokenExpired', true)
            }
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