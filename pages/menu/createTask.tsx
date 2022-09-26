import {api} from "../api/api";
import {useForm} from "react-hook-form";
import styles from "../../styles/menu/createTask.module.css";
import {TaskModel} from "../data/models/task.model";
import {CategoryModel} from "../data/models/category.model";
import {useEffect, useState} from "react";
import { toast, ToastContainer } from 'react-nextjs-toast'

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
        <div className={styles.cardTaskForm}>
            <div className=''>
                <img
                    src="/images/prototyping-process-bro.png"
                    alt="Imagem de gerenciamento de tarefas"
                    className={styles.imageTask}
                />
            </div>
            <div className={styles.cardInputs}>
                <form onSubmit={handleSubmit(handleCreateTask)} className={styles.inputsForm}>
                    <div>
                        <input
                            className={styles.inputsTasks}
                            { ...register('title') }
                            placeholder='Titulo'
                            type="text"
                            name='title'
                            required
                        />
                    </div>
                    <div>
                        <input
                            className={styles.inputsTasks}
                            { ...register('description') }
                            placeholder='Descrição'
                            type="text"
                            name='description'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="deadline">Data de finalização:</label> <br/>
                        <input
                            className={styles.inputsTasks}
                            { ...register('deadline') }
                            type="date"
                            name='deadline'
                            required
                        />
                    </div>
                    <div >
                        <select name="category">
                            {
                                categories !== null ? categories.map(category => {
                                    return(
                                        <option
                                            key={category.id}
                                            value={category.id}
                                            { ...register('category.id')}
                                        >
                                            {category.name}
                                        </option>
                                    )
                                }): <h1>Nenhuma categoria criada</h1>
                            }
                        </select>
                    </div>
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
                    <button type="submit" className={styles.buttonSendTask}>Criar tarefa</button>
                </form>
                <ToastContainer
                    align={'right'}
                    position={'bottom'}
                    type={'success'}
                    title={'Criada'}>
                </ToastContainer>
            </div>
        </div>
    )
}