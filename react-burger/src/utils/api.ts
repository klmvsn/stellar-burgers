import { BASE_URL, AUTH_URL } from "./constants";
import { getCookie } from "./cookie";
import { TIngridientDataResponse } from "./types";

const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const getIngridientsData = async () => {
    return await fetch(`${BASE_URL}/ingredients`)
        .then(res => checkResponse<TIngridientDataResponse>(res));
}

export const postOrder = async (orderId: string[]) => {
    return await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        body: JSON.stringify({
            ingredients: orderId
        })
    })
        .then(checkResponse)
}

export const registerUser = async (email: string, password: string, name: string | undefined) => {
    return await fetch(`${AUTH_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    })
        .then(checkResponse)
}

export const forgotPassword = async (email: string) => {
    return await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email
        })
    })
        .then(checkResponse);
}

export const resetPassword = async (password: string, code: string) => {
    return await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
            token: code
        })
    })
        .then(checkResponse);
}

export const signIn = async (email: string, password: string) => {
    return await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(checkResponse);
}

export const signOut = async () => {
    return await fetch(`${AUTH_URL}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        })
    })
        .then(checkResponse);
}

export const getUser = async () => {
    return await fetch(`${AUTH_URL}/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
    })
        .then(checkResponse)
}

export const updateToken = async () => {
    return await fetch(`${AUTH_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    })
        .then(checkResponse);
}

export const updateUser = async (name: string, email: string, password: string) => {
    return await fetch(`${AUTH_URL}/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        }),
    })
        .then(checkResponse);
}