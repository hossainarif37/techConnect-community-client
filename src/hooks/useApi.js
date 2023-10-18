import { baseURL, loading, token } from "../states/state";

//* Get data from database
export const getData = (url) => {
    return fetch(baseURL + url, {
        headers: {
            authorization: localStorage.getItem('token')
        }
    })
        .then(res => {
            console.log(res);
            if (!res.ok) {
                loading.value = false;
                token.value = ''
                localStorage.removeItem('token');
            }
            return res.json();
        })
        .then(data => {
            return data;
        })
}