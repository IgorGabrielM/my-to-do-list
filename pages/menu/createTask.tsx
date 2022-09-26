import {api} from "../api/api";
import {useForm} from "react-hook-form";
import styles from "../../styles/auth/login.module.css";
import {TaskModel} from "../data/models/task.model";
import {CategoryModel} from "../data/models/category.model";
import {useEffect, useState} from "react";
import { toast, ToastContainer } from 'react-nextjs-toast'
import {router} from "next/client";

export default function createTask(){
    const { register, handleSubmit } = useForm()
    const [ categories, setCategories ]: [CategoryModel[], any] = useState([])
    const [ criticalityLevels, setCriticalityLevels ]: [{id:number, description: string}[], any] = useState([])

    const loadCategories = async () => {
        const response = await api.get('category')
        setCategories(response.data)
    }

    const loadCriticalityLevels = async () => {
        const response = await api.get('criticality-level')
        setCriticalityLevels(response.data)
    }

    async function handleCreateTask(data: TaskModel){
        await api.post('/task', data)
        toast.notify('Tarefa criada com sucesso')
    }

    useEffect(() => {
        loadCategories();
        // loadCriticalityLevels()
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreateTask)}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        { ...register('title') }
                        type="text"
                        name='title'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Descrição:</label>
                    <input
                        { ...register('description') }
                        type="text"
                        name='description'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="deadline">Data de finalização:</label>
                    <input
                        { ...register('deadline') }
                        type="date"
                        name='deadline'
                        required
                    />
                </div>
                {
                    categories !== null ? categories.map(category => {
                        return(
                            <div key={category.id}>
                                <input
                                    type="radio"
                                    value={category.id}
                                    { ...register('category.id') }
                                />
                                <label>{category.name}</label>
                            </div>
                        )
                    }): <h1>Nenhuma categoria criada</h1>
                }
                {
                    criticalityLevels !== undefined ? criticalityLevels.map(criticalityLevel => {
                        return(
                            <div className='mt-5'>
                                <input
                                    type="radio"
                                    value={criticalityLevel.id}
                                    key={criticalityLevel.id}
                                    { ...register('category.id') }
                                />
                                <label>{criticalityLevel.description}</label>
                            </div>
                        )
                    }): <h1>Erro</h1>
                }
                <button type="submit" className={styles.buttonSend}>Criar tarefa</button>
            </form>
            <ToastContainer
                align={'right'}
                position={'bottom'}
                type={'success'}
                title={'Criada'}>
            </ToastContainer>
        </div>
    )
}