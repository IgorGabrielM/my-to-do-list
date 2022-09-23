import {api} from "../api/api";
import {GetServerSideProps} from "next";
import { parseCookies } from "nookies";
import {getApiClient} from "../api/axios";
import styles from '../../styles/menu/home.module.css'
import {useEffect, useState} from "react";
import {TaskModel} from "../data/models/task.model";

export default function Home() {

    const [tasks, setTasks]: [TaskModel[], any] = useState([])

    const loadTasks = async () => {
        const response = await api.get('/task')
        console.log(response.data)
        setTasks(response.data)
    }

    useEffect(() => {
        loadTasks();
    }, [])

    return(
        <div className={styles.content}>

            <div className={styles.tasks}>
                {
                    tasks !== null ? tasks.map(task => {
                        return(
                            <div className={styles.task}>
                                <p>{task.title}</p>
                            </div>
                        )
                    }): <h1>Nenhuma tarefa pendente</h1>
                }
            </div>
        </div>

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
    return {
        props: {}
    }
}