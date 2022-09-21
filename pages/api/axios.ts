import {parseCookies} from "nookies";
import axios from "axios";

export function getApiClient(ctx?: any){
    const { 'nextauth.token': token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:8080'
    })

    if (token){
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api
}