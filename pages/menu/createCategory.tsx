import {useForm} from "react-hook-form";
import {api} from "../api/api";
import {CategoryModel} from "../data/models/category.model";
import { toast, ToastContainer } from 'react-nextjs-toast'
import styles from "../../styles/auth/login.module.css";

export default function createCategory(){
    const { register, handleSubmit } = useForm()

    async function handleCreateCategory(data: CategoryModel){
        await api.post('/category', data)
        toast.notify('Categoria criada com sucesso')
    }

    return(
        <div>
            <form onSubmit={handleSubmit(handleCreateCategory)}>
                <label htmlFor="name">Nome da categoria:</label>
                <input
                    { ...register('name') }
                    type="text"
                    name='name'
                    required
                />
                <label htmlFor="colour">Cor:</label>
                <input
                    { ...register('colour') }
                    type="color"
                    name='colour'
                    required
                />
                <button type="submit">Criar categoria</button>
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