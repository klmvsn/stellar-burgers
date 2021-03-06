import { BASE_URL } from "./constants";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const getIngridients = () => {
    return fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse);
}

export const postOrder = (orderId) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ingredients: orderId
        })
    })
        .then(checkResponse)
}