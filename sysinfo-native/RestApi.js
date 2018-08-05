import {AsyncStorage} from "react-native";

export const ACCESS_TOKEN = "accessToken"

export default class RestApi {

    constructor(server, userName, password) {
        this._server = server;
        this._userName = userName;
        this._password = password;
    }

    async request(options) {
        const headers = new Headers({
            'Content-Type': 'application/json',
        })

        const token = await AsyncStorage.getItem(ACCESS_TOKEN)

        console.log('token ' + token)

        if(token) {
            headers.append('Authorization', 'Bearer ' + token)
        }

        const defaults = {headers: headers};
        options = Object.assign({}, defaults, options);

        return fetch(options.url, options)
            .then(response =>
                response.json().then(json => {
                    console.log(json)
                    if(!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                }).catch(err=>{})
            ).catch(err=>{})
    }

    getMemoryInfo() {
        return this.request({
            url: this._server + '/api/mem',
            method: 'GET'
        })
    }

    loadUser() {
        return this.request({
            url: this._server + '/api/user',
            method: 'GET'
        })
    }

    getSysInfo() {
        return this.request({
            url: this._server + '/api/sys',
            method: 'GET'
        })
    }

    login() {
        return this.request({
            url: this._server + '/api/auth/login',
            method: 'POST',
            body: JSON.stringify({
                userName: this._userName,
                password: this._password
            })
        })
    }


    get server() {
        return this._server;
    }

    set server(value) {
        this._server = value;
    }

    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}