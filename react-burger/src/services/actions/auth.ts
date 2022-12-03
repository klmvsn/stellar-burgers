import { registerUser, forgotPassword, resetPassword, signIn, signOut, getUser, updateToken, updateUser } from "../../utils/api";
import { AppDispatch } from "../../utils/types";
import {
    forgotPasswordFailed, forgotPasswordRequest, forgotPasswordSuccess,
    getUserFailed,
    getUserRequest,
    getUserSuccess,
    registerUserFailed, registerUserRequest, registerUserSuccess,
    resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess, signInFailed, signInRequest, signInSuccess, signOutFailed, signOutRequest, signOutSuccess, updateTokenFailed, updateTokenRequest, updateTokenSuccess, updateUserFailed, updateUserRequest, updateUserSuccess
} from "../slices/auth"

export const registerUserAction = (email: string, password: string, name: string | undefined) => (dispatch: AppDispatch) => {
    dispatch(registerUserRequest());
    registerUser(email, password, name)
        .then(res => dispatch(registerUserSuccess(res)))
        .catch(() => dispatch(registerUserFailed()));
}

export const forgotPasswordAction = (email: string) => (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequest());
    forgotPassword(email)
        .then(res => dispatch(forgotPasswordSuccess(res)))
        .catch(() => dispatch(forgotPasswordFailed()))
}

export const resetPasswordAction = (password: string, code: string) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequest());
    resetPassword(password, code)
        .then(res => dispatch(resetPasswordSuccess(res)))
        .catch(() => dispatch(resetPasswordFailed()))
}

export const signInAction = (email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(signInRequest());
    signIn(email, password)
        .then(res => dispatch(signInSuccess(res)))
        .catch(() => dispatch(signInFailed()))
}

export const signOutAction = () => (dispatch: AppDispatch) => {
    dispatch(signOutRequest());
    signOut()
        .then(() => dispatch(signOutSuccess()))
        .catch(() => dispatch(signOutFailed()))
}

export const getUserAction = () => (dispatch: AppDispatch) => {
    dispatch(getUserRequest());
    getUser()
        .then(res => dispatch(getUserSuccess(res)))
        .catch((err) => {
            if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
                updateToken()
                    .then(res => {
                        dispatch(updateTokenSuccess(res));
                    })
                    .then(() => getUser())
                    .then(res => dispatch(getUserSuccess(res)))
                    .catch(() => getUserFailed())
            }
            else {
                dispatch(getUserFailed());
            }
        })
}

export const updateTokenAction = () => (dispatch: AppDispatch) => {
    dispatch(updateTokenRequest());
    updateToken()
        .then(res => dispatch(updateTokenSuccess(res)))
        .catch(() => dispatch(updateTokenFailed()))
}

export const updateUserAction = (name: string, email: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(updateUserRequest());
    updateUser(name, email, password)
        .then(res => dispatch(updateUserSuccess(res)))
        .catch((err) => dispatch(updateUserFailed(err)))
}