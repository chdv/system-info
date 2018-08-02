import { SYS_REST_URL, ACCESS_TOKEN, LOGIN_REST_URL, MEM_REST_URL, USER_REST_URL } from './Constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if(!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        )
}

export function getSysInfo() {
    return request({
        url: SYS_REST_URL,
        method: 'GET'
    })
}

export function loadCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: USER_REST_URL,
        method: 'GET'
    });
}

export function getMemoryInfo() {
    return request({
        url: MEM_REST_URL,
        method: 'GET'
    })
}

export function login(loginRequest) {
    return request({
        url: LOGIN_REST_URL,
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}