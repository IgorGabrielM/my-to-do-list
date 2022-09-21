import {useForm} from "react-hook-form";
import {api} from "../api/api";
import Router from "next/router";
import styles from "../../styles/auth/login.module.css";

export default function CreateUser(){
    const { register, handleSubmit } = useForm();

    async function handleSendNewUser(data){
        console.log(data)
        await api.post('/user', data)
        Router.push('/auth')
    }
    return(
        <div className='flex justify-center items-center h-screen'>
            <div className={styles.cardLogin}>
                <form onSubmit={handleSubmit(handleSendNewUser)}>
                    <div className='mb-2'>
                        <label htmlFor="username">Nome de usuário:</label>
                        <input
                            { ...register('username') }
                            className={styles.inputLogin}
                            type="text"
                            name='username'
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="email">Email:</label>
                        <input
                            { ...register('email') }
                            className={styles.inputLogin}
                            type="text"
                            name='email'
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="phone">phone:</label>
                        <input
                            { ...register('phone') }
                            className={styles.inputLogin}
                            type="text"
                            name='phone'
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password">Senha:</label>
                        <input
                            { ...register('password') }
                            className={styles.inputLogin}
                            type="password"
                            name='password'
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="passwordVerification">Confirmar senha:</label>
                        <input
                            { ...register('passwordVerification') }
                            className={styles.inputLogin}
                            type="password"
                            name='passwordVerification'
                            required
                        />
                    </div>
                    <button type='submit' className={styles.buttonSend}>Enviar</button>
                </form>
            </div>
        </div>
    )
}