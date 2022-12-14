import {useContext, useEffect} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {api} from "../api/api";
import {GetServerSideProps} from "next";
import { parseCookies } from "nookies";
import {getApiClient} from "../api/axios";

export default function Dashboard() {
    const { user } = useContext(AuthContext)

    useEffect(() => {
        api.get("/user")
    }, [])

    return(
        <h1>Ola mundo</h1>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = getApiClient(ctx)
    const {['nextauth.token']: token} = parseCookies(ctx)
    if (!token){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    await api.get('/users')
    return {
        props: {}
    }
}