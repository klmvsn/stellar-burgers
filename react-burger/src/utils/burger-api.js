import { BASE_URL } from "./constants";

const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const getIngridients = () => {
    return fetch(BASE_URL)
        .then(checkResponse);
}