import {api} from "../api/api";
import {useForm} from "react-hook-form";
import styles from "../../styles/auth/login.module.css";
import {TaskModel} from "../data/models/task.model";
import {CategoryModel} from "../data/models/category.model";
import {useEffect, useState} from "react";

export default function createTask(){
    const { register, handleSubmit } = useForm()
    const [ categories, setCatergories ]: [CategoryModel[], any] = useState([])

    const loadCategories = async () => {
        const response = await api.get('category')
        console.log(response.data)
        setCatergories(response.data)
    }

    async function handleCreateTask(data: TaskModel){
        console.log(data)
        await api.post('/task', data)
        //toastr de confirmação
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit(handleCreateTask)}>
                <label htmlFor="title">Title:</label>
                <input
                    { ...register('title') }
                    className={styles.inputLogin}
                    type="text"
                    name='title'
                    required
                />
                <label htmlFor="description">Descrição:</label>
                <input
                    { ...register('description') }
                    className={styles.inputLogin}
                    type="text"
                    name='description'
                    required
                />
                <label htmlFor="deadline">Data de finalização:</label>
                <input
                    { ...register('deadline') }
                    className={styles.inputLogin}
                    type="text"
                    name='deadline'
                    required
                />
            </form>
        </div>
    )
}