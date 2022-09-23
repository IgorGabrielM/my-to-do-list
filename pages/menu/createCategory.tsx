import {useForm} from "react-hook-form";
import {api} from "../api/api";
import {CategoryModel} from "../data/models/category.model";
import styles from "../../styles/auth/login.module.css";

export default function createCategory(){
    const { register, handleSubmit } = useForm()

    async function handleCreateCategory(data: CategoryModel){
        await api.post('/category', data)
    }

    return(
        <div>
            <form>
                <label htmlFor="name">Nome da categoria:</label>
                <input
                    { ...register('name') }
                    className={styles.inputLogin}
                    type="text"
                    name='name'
                    required
                />
                <label htmlFor="colour">Cor:</label>
                <input
                    { ...register('colour') }
                    className={styles.inputLogin}
                    type="color"
                    name='colour'
                    required
                />
            </form>
        </div>
    )
}