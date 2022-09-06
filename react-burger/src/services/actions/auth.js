import { registerUser, forgotPassword, resetPassword, signIn, signOut, getUser, updateToken, updateUser } from "../../utils/api";
import {
    forgotPasswordFailed, forgotPasswordRequest, forgotPasswordSuccess,
    getUserFailed,
    getUserRequest,
    getUserSuccess,
    registerUserFailed, registerUserRequest, registerUserSuccess,
    resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess, signInFailed, signInRequest, signInSuccess, signOutFailed, signOutRequest, signOutSuccess, updateTokenFailed, updateTokenRequest, updateTokenSuccess, updateUserFailed, updateUserRequest, updateUserSuccess
} from "../slices/auth"

export const registerUserAction = (email, password, name) => (dispatch) => {
    dispatch(registerUserRequest());
    registerUser(email, password, name)
        .then(res => dispatch(registerUserSuccess(res)))
        .catch(() => dispatch(registerUserFailed()));
}

export const forgotPasswordAction = (email) => (dispatch) => {
    dispatch(forgotPasswordRequest());
    forgotPassword(email)
        .then(res => dispatch(forgotPasswordSuccess(res)))
        .catch(() => dispatch(forgotPasswordFailed()))
}

export const resetPasswordAction = (password, code) => (dispatch) => {
    dispatch(resetPasswordRequest());
    resetPassword(password, code)
        .then(res => dispatch(resetPasswordSuccess(res)))
        .catch(() => dispatch(resetPasswordFailed()))
}

export const signInAction = (email, password) => (dispatch) => {
    dispatch(signInRequest());
    signIn(email, password)
        .then(res => dispatch(signInSuccess(res)))
        .catch(() => dispatch(signInFailed()))
}

export const signOutAction = () => (dispatch) => {
    dispatch(signOutRequest());
    signOut()
        .then(res => dispatch(signOutSuccess(res)))
        .catch(() => dispatch(signOutFailed()))
}

export const getUserAction = () => (dispatch) => {
    dispatch(getUserRequest());
    getUser()
        .then(res => dispatch(getUserSuccess(res)))
        .catch((err) => {
            if(err.message === 'jwt expired'){ 
                updateToken()
                    .then(res => dispatch(updateTokenSuccess(res)))
                    .then(() => dispatch(getUserAction()))
                    .catch(() => dispatch(updateTokenFailed()))
            }
            else {
                dispatch(getUserFailed());
            }
        })
}

export const updateTokenAction = () => (dispatch) => {
    dispatch(updateTokenRequest());
    updateToken()
        .then(res => dispatch(updateTokenSuccess(res)))
        .catch(() => dispatch(updateTokenFailed()))
}

export const updateUserAction = (name, email, password) => (dispatch) => {
    dispatch(updateUserRequest());
    updateUser(name, email, password)
        .then(res => dispatch(updateUserSuccess(res)))
        .catch((err) => dispatch(updateUserFailed(err)))
}