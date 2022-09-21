import {createContext, useEffect, useState} from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from "next/router"

import {AuthModel} from "../auth/models/auth.model";
import {UserModel} from "../auth/models/user.model";
import {api} from "../api/api";

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserModel;
    signIn: (data: AuthModel) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<UserModel | null>(null)
    const isAuthenticated = !!user;

    async function signIn({email, password}: AuthModel) {
        const data = await api.post("auth/login", {email, password})
        console.log(data.data.token)
        setCookie(undefined, 'nextauth.token', data.data.token, {maxAge: 60 * 60 * 1}) //1 hour
        api.defaults.headers['Authorization'] = `Bearer ${data}`
        setUser(user)
        Router.push('/menu/home')
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}